"use server";

import { routeApi } from "@/lib/router/router";
import { getCookie, getCookieString } from "@/lib/utils/cookies";

export const getCookies = async (renewCookies: boolean) => {
    if (!renewCookies) {
        const cookies = await getCookieString();

        return {
            cookies: cookies,
            csrfToken: (await getCookie("XSRF-TOKEN"))?.value ?? "",
        };
    }

    try {
        const setCookie = (await fetchCsrf()).headers.getSetCookie();

        const csrfTokenCookie = setCookie.find((cookie: string) =>
            cookie.startsWith("XSRF-TOKEN")
        ) as string;

        const cookies = setCookie.join(";");
        const csrfToken = decodeURIComponent(
            csrfTokenCookie?.match(/^XSRF-TOKEN=(.+?);/)?.[1] ?? ""
        );

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

export const defaultHeaders = async (renewCookies: boolean) => {
    const { cookies, csrfToken } = await getCookies(renewCookies);

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
    renewCookies = false
) => {
    if (init === undefined) {
        init = { headers: {} };
    }

    init.credentials = "include";
    init.referrer = process.env.FRONT_URL as string;

    const _defaultHeaders = await defaultHeaders(renewCookies);

    init.headers = {
        ..._defaultHeaders,
        ...(init.headers ?? {}),
    };

    return fetch(url, init);
};

export const fetchCsrf = async () =>
    fetch(routeApi("sanctum.csrf-cookie"), {
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        referrer: process.env.FRONT_URL as string,
    });
