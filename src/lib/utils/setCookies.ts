"use client";

import { route } from "@/lib/router/router";

export const setCookies = (setCookie: string[]) => {
    const headers = new Headers({
        "X-Set-Cookie": setCookie.join(","),
    });

    return fetch(route("front.set.cookies"), {
        method: "POST",
        headers: headers,
    });
};
