"use server";

import { hasMiddleware } from "@/lib/middleware";
import { getCurrentRoute, link, linkApi } from "@/lib/router/router";
import { formDataToJson } from "@/lib/utils";
import { setCookies } from "@/lib/utils/cookies";
import { fetchApi } from "@/lib/utils/server";
import { revalidatePath } from "next/cache";
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

            await setCookies(response.headers.getSetCookie());

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
    const data = {
        login: formData.get("login"),
        password: formData.get("password"),
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

            await setCookies(response.headers.getSetCookie());

            redirect(link("front.cp.dashboard.index"), RedirectType.replace);
        }
    );
};

export const register = async (prevState: AuthState, formData: FormData) => {
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

    return fetchApi(linkApi("register.store"), options, true).then(
        async (response) => {
            if (!response.ok) {
                const data = await response.json();

                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            await setCookies(response.headers.getSetCookie());

            redirect(link("front.verification.notice"));
        }
    );
};

// export const createUser = async (prevState: PagesState, formData: FormData) => {
//     const options: RequestInit = {
//         method: "POST",
//         body: toJson(formData, "title", "text"),
//     };

//     return fetchApi(linkApi("register.store"), options, true).then(
//         async (response) => {
//             const data = await response.json();

//             if (!response.ok) {
//                 return {
//                     message: data.message,
//                     errors: data.errors,
//                 };
//             }

//             redirect(link("front.cp.pages.edit", { pageId: data.data.id }));
//         }
//     );
// };

export const updateUser = async (prevState: AuthState, formData: FormData) => {
    const update = formData.get("update_user");
    const fields: string[] = [];

    switch (update) {
        case "profile":
            fields.push(
                "name_first",
                "name_second",
                "name_last",
                "name_display",
                "phone",
                "phone_prefix"
            );
            break;

        case "email":
            fields.push("email");
            break;

        case "username":
            fields.push("username");
            break;

        default:
            break;
    }

    const options: RequestInit = {
        method: "PUT",
        body: formDataToJson(formData, "update_user", ...fields),
    };

    return fetchApi(
        linkApi("user-profile-information.update"),
        options,
        true
    ).then(async (response) => {
        if (!response.ok) {
            const data = await response.json();

            return {
                message: data.message,
                errors: data.errors,
            };
        }

        return { message: "Successfully updated" };
    });
};

export const updateUserPassword = async (
    prevState: AuthState,
    formData: FormData
) => {
    const options: RequestInit = {
        method: "PUT",
        body: formDataToJson(
            formData,
            "current_password",
            "password",
            "password_confirmation"
        ),
    };

    return fetchApi(linkApi("user-password.update"), options, true).then(
        async (response) => {
            if (!response.ok) {
                const data = await response.json();

                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            redirect(link("front.login"));
        }
    );
};

export const destroyUser = async (user: string, redirectLink?: string) => {
    const options: RequestInit = {
        method: "DELETE",
    };

    return fetchApi(linkApi("api.users.destroy", { user }), options, true).then(
        async (response) => {
            const data = await response.json();

            if (!response.ok) {
                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            revalidatePath(link("front.cp.users.index"));

            if (redirectLink) {
                redirect(redirectLink, RedirectType.replace);
            }

            return { message: data.message };
        }
    );
};
