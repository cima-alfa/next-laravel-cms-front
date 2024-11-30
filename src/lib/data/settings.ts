"use server";

import { linkApi } from "@/lib/router/router";
import { fetchApi } from "@/lib/utils/server";
import { simulateDelay } from "@/lib/utils/server";

export type Settings = {
    [key: string]: string | null;
};

export const fetchSettings = async (): Promise<Settings> => {
    await simulateDelay(1);

    return await fetchApi(linkApi("api.settings.index")).then(
        async (response) => {
            const settings: Settings = {};

            ((await response.json())?.data as [])?.map(
                (setting: { [key: string]: string | null }) => {
                    const data = Object.entries(setting);

                    settings[data[0][0]] = data[0][1];
                }
            );

            return settings;
        }
    );
};
