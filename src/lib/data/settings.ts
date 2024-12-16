"use server";

import { linkApi } from "@cms/router";
import { apiData } from "@cms/fetch";
import { simulateDelay } from "@cms/fetch";
import { SimpleObject } from "@cms/helpers";

export type Settings = SimpleObject<string | null>;

export const fetchSettings = async (): Promise<Settings> => {
    await simulateDelay(1);

    return await apiData(linkApi("api.settings.index")).then(
        async (response) => {
            const settings: Settings = {};

            ((await response.json())?.data as [])?.map((setting: Settings) => {
                const data = Object.entries(setting);

                settings[data[0][0]] = data[0][1];
            });

            return settings;
        }
    );
};
