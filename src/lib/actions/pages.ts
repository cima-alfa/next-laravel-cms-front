"use server";

import { link, linkApi } from "@/lib/router/router";
import { fetchApi } from "@/lib/utils/fetch";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export type PagesState = {
    message: string;
    errors?: { [key: string]: string[] };
} | null;

const toJson = (formData: FormData, ...fields: string[]) => {
    const data: { [key: string]: unknown } = {};

    fields.forEach((field) => {
        data[field] = formData.get(field);
    });

    return JSON.stringify(data);
};

export const createPage = async (prevState: PagesState, formData: FormData) => {
    const options: RequestInit = {
        method: "POST",
        body: toJson(formData, "title", "text"),
    };

    return fetchApi(linkApi("api.pages.store"), options, true).then(
        async (response) => {
            const data = await response.json();

            if (!response.ok) {
                return {
                    message: data.message,
                    errors: data.errors,
                };
            }

            redirect(link("front.cp.pages.edit", { id: data.data.id }));
        }
    );
};

export const updatePage = async (
    id: string,
    prevState: PagesState,
    formData: FormData
) => {
    const options: RequestInit = {
        method: "PATCH",
        body: toJson(formData, "title", "text"),
    };

    return fetchApi(
        linkApi("api.pages.update", { id: id }),
        options,
        true
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

export const destroyPage = async (id: string, redirectLink?: string) => {
    const options: RequestInit = {
        method: "DELETE",
    };

    return fetchApi(
        linkApi("api.pages.destroy", { id: id }),
        options,
        true
    ).then(async (response) => {
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
    });
};
