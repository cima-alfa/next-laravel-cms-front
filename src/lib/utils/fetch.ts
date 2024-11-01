"use server";

import "server-only";
import { linkApi } from "@/lib/router/router";
import { getCookie, getCookieString, setCookie } from "@/lib/utils/cookies";

const getCookies = async (freshCookies: boolean) => {
    if (!freshCookies) {
        const cookies = await getCookieString();

        return {
            cookies,
            csrfToken: (await getCookie("XSRF-TOKEN"))?.value ?? "",
        };
    }

    try {
        const _setCookie = (await fetchCsrf()).headers.getSetCookie();

        const cookies = _setCookie.join(";");

        const csrfTokenCookie = _setCookie.find((cookie: string) =>
            cookie.startsWith("XSRF-TOKEN")
        ) as string;

        const csrfToken = decodeURIComponent(
            csrfTokenCookie?.match(/^XSRF-TOKEN=(.+?);/)?.[1] ?? ""
        );

        await setCookie(csrfTokenCookie);

        return {
            cookies,
            csrfToken,
        };
    } catch (error) {
        console.error("Get Renewed Cookies Error:", error);

        return {
            cookies: "",
            csrfToken: "",
        };
    }
};

export const defaultHeaders = async (
    freshCookies: boolean
): Promise<HeadersInit> => {
    const { cookies, csrfToken } = await getCookies(freshCookies);

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": csrfToken,
        Cookie: cookies,
    };
};

export const fetchApi = async (
    url: string,
    init?: RequestInit,
    freshCookies = false
) => {
    if (init === undefined) {
        init = { headers: {} };
    }

    init.credentials = "include";
    init.referrer = process.env.NEXT_PUBLIC_FRONT_URL as string;

    const _defaultHeaders = await defaultHeaders(freshCookies);

    init.headers = {
        ..._defaultHeaders,
        ...(init.headers ?? {}),
    };

    return fetch(url, init);
};

export const fetchCsrf = async () => {
    const headers = await defaultHeaders(false);

    return fetch(linkApi("sanctum.csrf-cookie"), {
        credentials: "include",
        headers: headers,
        referrer: process.env.NEXT_PUBLIC_FRONT_URL as string,
    });
};
