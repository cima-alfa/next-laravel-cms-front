"use server";

import { link, linkApi } from "@cms/router";
import { formDataToJson } from "@cms/helpers";
import { apiAction } from "@cms/fetch";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

// export const createUser = async (prevState: PagesState, formData: FormData) => {
//     const options: RequestInit = {
//         method: "POST",
//         body: toJson(formData, "title", "text"),
//     };

//     return apiAction(linkApi("register.store"), options).then(
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

export type UserState =
    | {
          message?: string;
          errors?: { [key: string]: string[] };
      }
    | null
    | undefined;

export const updateUser = async (
    prevState: UserState,
    formData: FormData
): Promise<UserState> => {
    const update = formData.get("update_user");
    const fields: string[] = [];

    switch (update) {
        case "profile":
            formData.set(
                "phone_prefix",
                ((formData.get("phone_prefix") ?? "") as string).replace(
                    "+",
                    ""
                )
            );

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

    return apiAction(linkApi("user-profile-information.update"), options).then(
        async (response) => {
            if (!response.ok) {
                const data = await response.json();

                return {
                    errors: data.errors,
                };
            }

            return { message: "Successfully updated" };
        }
    );
};

export const updateUserPassword = async (
    prevState: UserState,
    formData: FormData
): Promise<UserState> => {
    const options: RequestInit = {
        method: "PUT",
        body: formDataToJson(
            formData,
            "current_password",
            "password",
            "password_confirmation"
        ),
    };

    return apiAction(linkApi("user-password.update"), options).then(
        async (response) => {
            if (!response.ok) {
                const data = await response.json();

                return {
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

    return apiAction(linkApi("api.users.destroy", { user }), options).then(
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
