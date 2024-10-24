"use server";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getCookieStore(): Promise<RequestCookie[]>;

export async function getCookieStore(
    ...names: string[]
): Promise<{ [key: string]: RequestCookie | undefined }>;

export async function getCookieStore(...names: string[]) {
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
    return (await cookies()).toString();
};

export const getCookie = async (name: string) => {
    const cookieStore = await cookies();

    return cookieStore.get(name);
};
