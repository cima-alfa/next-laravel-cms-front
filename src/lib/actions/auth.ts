"use server";

import { hasMiddleware } from "@/lib/middleware";
import { getCurrentRoute, link, linkApi } from "@/lib/router/router";
import { fetchApi, setCookies } from "@/lib/utils/fetch";
import { redirect, RedirectType } from "next/navigation";

export type AuthState = {
    message: string;
    errors?: { [key: string]: string[] };
} | null;

export const logout = async (pathname?: string) => {
    await fetchApi(linkApi("logout"), { method: "POST" }, true).then(
        async (response) => {
            if (!response.ok) {
                return;
            }

            await setCookies(response);

            if (pathname !== undefined) {
                const currentRoute = getCurrentRoute(pathname);

                if (hasMiddleware(currentRoute, "front:auth")) {
                    redirect(link("front.login"), RedirectType.replace);
                }
            }
        }
    );
};

export const login = async (prevState: AuthState, formData: FormData) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = {
        login: formData?.get("login"),
        password: formData?.get("password"),
    };

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
    };

    return fetchApi(linkApi("login.store"), options, true).then(
        async (response) => {
            if (!response.ok) {
                const data = await response.json();

                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            await setCookies(response);

            redirect(link("front.cp.dashboard.index"), RedirectType.replace);
        }
    );
};

export const register = async (prevState: AuthState, formData: FormData) => {
    const data = {
        username: formData?.get("username"),
        email: formData?.get("email"),
        password: formData?.get("password"),
        password_confirmation: formData?.get("password_confirmation"),
    };

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
    };

    return fetchApi(linkApi("register.store"), options, true).then(
        async (response) => {
            if (!response.ok) {
                const data = await response.json();

                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            await setCookies(response);

            redirect(link("front.verification.notice"));
        }
    );
};
