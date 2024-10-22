"use server";

import { routeApi } from "@/lib/router/router";
import { fetchApi } from "@/lib/utils/fetch";

export const login = async (state: void | undefined, formData: FormData) => {
    //setErrors([]);

    const data = {
        login: formData?.get("login"),
        password: formData?.get("password"),
    };

    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
    };

    return fetchApi(routeApi("login"), options, true).then((response) => {
        return { ok: response.ok, setCookie: response.headers.getSetCookie() };
    });
};

export const register = async (state: void | undefined, formData: FormData) => {
    //setErrors([]);

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

    await fetchApi(routeApi("register"), options, true);
};
