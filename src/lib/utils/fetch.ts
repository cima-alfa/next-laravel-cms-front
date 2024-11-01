"use server";

import { linkApi } from "@/lib/router/router";
import {
    getCookie,
    getCookieStore,
    getCookieString,
} from "@/lib/utils/cookies";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getCookies = async (freshCookies: boolean) => {
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

export const setCookie = async (cookie: string) => {
    const cookieStore = await getCookieStore();

    const cookieData = `${cookie};`.matchAll(/\s*(.+?)\s*(?:=\s*(.+?))?\s*;/g);

    const cookieNameValue = cookieData.next();

    const setCookie: { [key: string]: string } = {
        name: cookieNameValue.value?.at(1) as string,
        value: cookieNameValue.value?.at(2) as string,
    };

    cookieData.forEach((data) => {
        // eslint-disable-next-line prefer-const
        let [, key, value] = data;

        switch (key.toLowerCase()) {
            case "httponly":
                key = "httpOnly";
                break;

            case "samesite":
                key = "sameSite";
                break;

            case "max-age":
                key = "maxAge";
                break;
        }

        setCookie[key] = value ?? true;
    });

    cookieStore.set(setCookie as unknown as ResponseCookie);
};

export const setCookies = async (response: Response) => {
    response.headers.getSetCookie().forEach((cookie) => {
        setCookie(cookie);
    });
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
