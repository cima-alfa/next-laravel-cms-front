"use server";

import { link, linkApi } from "@cms/router";
import { formDataToObject } from "@cms/helpers";
import { apiAction } from "@cms/fetch";
import { revalidatePath } from "next/cache";

export type SettingsState = {
    message: string;
    errors?: { [key: string]: string[] };
} | null;

export type Settings = {
    [key: string]: string | null;
};

const generalSettings = (formData: FormData) => {
    return {
        settings: formDataToObject(
            formData,
            "general.website_name",
            "general.frontpage"
        ),
    };
};

const emailsSettings = (formData: FormData) => {
    return {
        settings: formDataToObject(
            formData,
            "mail.mailers.default.transport",
            "mail.mailers.default.host",
            "mail.mailers.default.port",
            "mail.mailers.default.username",
            "mail.mailers.default.password",
            "mail.mailers.default.encryption",
            "mail.mailers.default.from.email",
            "mail.mailers.default.from.name"
        ),
    };
};

export const updateSettings = async (
    type: "general" | "emails",
    prevState: SettingsState,
    formData: FormData
) => {
    let settings: { settings: { [key: string]: unknown } };

    switch (type) {
        case "general":
            settings = generalSettings(formData);

            break;

        case "emails":
            settings = emailsSettings(formData);

            break;
    }

    const options: RequestInit = {
        method: "PATCH",
        body: JSON.stringify(settings),
    };

    return apiAction(linkApi("api.settings.update", { type }), options).then(
        async (response) => {
            const data = await response.json();

            if (!response.ok) {
                const errors: { [key: string]: string[] } = {};

                Object.entries(data.errors ?? {}).map((error) => {
                    errors[error[0].replace(/^settings\./, "")] =
                        error[1] as string[];
                });

                return {
                    message: data.message,
                    errors,
                };
            }

            revalidatePath(link("front.cp.settings.index"));

            return { message: data.message };
        }
    );
};
