"use server";

import {
    RequestCookie,
    ResponseCookie,
} from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getCookies(): Promise<RequestCookie[]>;

export async function getCookies(
    ...names: string[]
): Promise<{ [key: string]: RequestCookie | undefined }>;

export async function getCookies(...names: string[]) {
    const cookieStore = await cookies();

    if (!names.length) {
        return cookieStore.getAll();
    }

    const _cookies: { [key: string]: RequestCookie | undefined } = {};

    for (let index = 0; index < names.length; index++) {
        const name = names[index];

        _cookies[name] = cookieStore.get(name);
    }

    return _cookies;
}

export const getCookieString = async () => {
    const cookies = await getCookies();

    const cookieStrings: string[] = [];

    cookies.map((cookie) => {
        cookieStrings.push(`${cookie.name}=${cookie.value}`);
    });

    return cookieStrings.join(";");
};

export const getCookie = async (name: string) => {
    const cookieStore = await cookies();

    return cookieStore.get(name);
};

export const getCookieStore = async () => await cookies();

export const setCookie = async (cookie: string) => {
    const cookieStore = await cookies();

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

export const setCookies = async (cookies: string[]) => {
    cookies.forEach((cookie) => {
        setCookie(cookie);
    });
};
