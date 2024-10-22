"use server";

import { routeApi } from "@/lib/router/router";
import { fetchApi } from "@/lib/utils/fetch";

export const fetchUser = async (): Promise<{
    [key: string]: unknown;
} | null> => {
    return fetchApi(routeApi("api.user")).then(
        async (response) => (await response.json())?.data ?? null
    );
};
