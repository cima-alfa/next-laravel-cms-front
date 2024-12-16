"use server";

import { link, linkApi } from "@cms/router";
import { formDataToJson, FormState } from "@cms/helpers";
import { apiAction } from "@cms/fetch";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export const createPage = async (prevState: FormState, formData: FormData) => {
    const options: RequestInit = {
        method: "POST",
        body: formDataToJson(formData, "title", "text", "published"),
    };

    return apiAction(linkApi("api.pages.store"), options).then(
        async (response) => {
            const data = await response.json();

            if (!response.ok) {
                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            redirect(link("front.cp.pages.edit", { pageId: data.data.id }));
        }
    );
};

export const updatePage = async (
    page: string,
    prevState: FormState,
    formData: FormData
) => {
    const options: RequestInit = {
        method: "PATCH",
        body: formDataToJson(formData, "title", "text", "published"),
    };

    return apiAction(linkApi("api.pages.update", { page }), options).then(
        async (response) => {
            const data = await response.json();

            if (!response.ok) {
                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            revalidatePath(link("front.cp.pages.index"));

            return { message: data.message };
        }
    );
};

export const updatePageMetadata = async (
    page: string,
    prevState: FormState,
    formData: FormData
) => {
    const options: RequestInit = {
        method: "PATCH",
        body: formDataToJson(
            formData,
            "permalink",
            "title",
            "description",
            "robots",
            "sitemap_include",
            "sitemap_prio",
            "sitemap_change_freq"
        ),
    };

    return apiAction(
        linkApi("api.pages.updateMetadata", { page }),
        options
    ).then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
            return {
                message: data.message,
                errors: data.errors,
            };
        }

        revalidatePath(link("front.cp.pages.index"));

        return { message: data.message };
    });
};

export const destroyPage = async (page: string, redirectLink?: string) => {
    const options: RequestInit = {
        method: "DELETE",
    };

    return apiAction(linkApi("api.pages.destroy", { page }), options).then(
        async (response) => {
            const data = await response.json();

            if (!response.ok) {
                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            revalidatePath(link("front.cp.pages.index"));

            if (redirectLink) {
                redirect(redirectLink, RedirectType.replace);
            }

            return { message: data.message };
        }
    );
};
