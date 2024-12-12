"use server";

import { hasMiddleware } from "@cms/middleware";
import {
    getRouteByUrl,
    link,
    linkApi,
    routeExists,
    RouteName,
} from "@cms/router";
import { setCookies } from "@cms/cookies";
import { apiAction } from "@cms/fetch";
import { redirect, RedirectType } from "next/navigation";

export type AuthState = {
    message: string;
    errors?: { [key: string]: string[] };
} | null;

export const logout = async (pathname?: string) => {
    await apiAction(linkApi("logout"), { method: "POST" }).then(
        async (response) => {
            if (!response.ok) {
                return;
            }

            await setCookies(response.headers.getSetCookie());

            if (pathname !== undefined) {
                const currentRoute = getRouteByUrl(pathname);

                if (hasMiddleware(currentRoute, "front:auth")) {
                    redirect(link("front.login"), RedirectType.replace);
                }
            }
        }
    );
};

export const login = async (prevState: AuthState, formData: FormData) => {
    const data = {
        login: formData.get("login"),
        password: formData.get("password"),
    };

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
    };

    return apiAction(linkApi("login.store"), options).then(async (response) => {
        if (!response.ok) {
            const data = await response.json();

            return {
                message: data.message,
                errors: data.errors,
            };
        }

        await setCookies(response.headers.getSetCookie());

        redirect(link("front.cp.dashboard.index"), RedirectType.replace);
    });
};

export const register = async (
    expires: string | null,
    signature: string | null,
    prevState: AuthState,
    formData: FormData
) => {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation"),
    };

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
    };

    return apiAction(
        linkApi("register.store", { expires, signature }),
        options
    ).then(async (response) => {
        if (!response.ok) {
            const data = await response.json();

            return {
                message: data.message,
                errors: data.errors,
            };
        }

        await setCookies(response.headers.getSetCookie());

        const route = (
            routeExists("front.verification.notice")
                ? "front.verification.notice"
                : "front.cp.dashboard.index"
        ) as RouteName;

        redirect(link(route));
    });
};

export const invite = async (prevState: AuthState, formData: FormData) => {
    const data = {
        email: formData.get("email"),
    };

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
    };

    return apiAction(linkApi("api.users.invite"), options).then(
        async (response) => {
            if (!response.ok) {
                const data = await response.json();

                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            return {
                message: "User invited.",
            };
        }
    );
};
