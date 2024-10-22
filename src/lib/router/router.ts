import { route as routeFn } from "ziggy-js";
import { Ziggy as RouterApi } from "@/lib/router/router-api";
import { Ziggy as RouterFront } from "@/lib/router/router-front";

export const routeApi = (
    name: keyof typeof RouterApi.routes,
    params?: { [key: string]: unknown }
) => {
    /** @ts-expect-error Generated ziggy config does not match the config interface */
    return routeFn<typeof name>(name, params, true, RouterApi);
};

export const route = (
    name: keyof typeof RouterFront.routes,
    params?: { [key: string]: unknown },
    absolute = false
) => {
    try {
        /** @ts-expect-error Generated ziggy config does not match the config interface */
        let link = routeFn<typeof name>(name, params, absolute, RouterFront);

        if (!absolute) {
            link = `/${link}`.replace(/^\/{2,}/, "/");
        }

        return link;
    } catch {
        return `#${name}-not-found`;
    }
};
