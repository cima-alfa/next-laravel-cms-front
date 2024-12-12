"use server";

import "server-only";
import { FrontUrl, linkApi } from "@cms/router";
import { getCookie, getCookieString, setCookie } from "@cms/cookies";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { sleep } from "@cms/helpers";

export const simulateDelay = async (seconds: number, force = false) => {
    const status =
        ((process.env.SIMULATE_FETCH_DELAY === "null" ||
            process.env.SIMULATE_FETCH_DELAY === null) &&
            process.env.NODE_ENV === "development") ||
        process.env.SIMULATE_FETCH_DELAY === "true";

    if (force || status) {
        await sleep(seconds);
    }
};

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
    const headersList = await headers();
    const ip = (headersList.get("x-forwarded-for") ??
        headersList.get("x-real-ip") ??
        headersList.get("host")) as string;

    const { cookies, csrfToken } = await getCookies(freshCookies);
    const { ua: userAgentString } = userAgent({ headers: headersList });

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": csrfToken,
        Cookie: cookies,
        "User-Agent": userAgentString,
        "X-Real-Ip": ip,
        "X-Forwarded-For": ip,
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

    if (init.method === undefined) {
        init.method = "GET";
    }

    init.credentials = "include";
    init.referrer = FrontUrl as string;

    const _defaultHeaders = await defaultHeaders(freshCookies);

    init.headers = {
        ..._defaultHeaders,
        ...(init.headers ?? {}),
    };

    return fetch(url, init);
};

export const apiData = async (url: string, init?: RequestInit) => {
    if (init === undefined) {
        init = {};
    }

    if (init.method === undefined) {
        init.method = "GET";
    }

    return fetchApi(url, init, false);
};

export const apiAction = async (url: string, init?: RequestInit) => {
    if (init === undefined) {
        init = {};
    }

    if (init.method === undefined) {
        init.method = "POST";
    }

    return fetchApi(url, init, true);
};

export const fetchCsrf = async () => {
    const headers = await defaultHeaders(false);

    return fetch(linkApi("sanctum.csrf-cookie"), {
        credentials: "include",
        headers: headers,
        referrer: FrontUrl as string,
    });
};
