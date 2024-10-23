import { route as routeFn, Router } from "ziggy-js";
import { Ziggy as RouterApi } from "@/lib/router/router-api";
import { Ziggy as RouterFront } from "@/lib/router/router-front";
import { type NextRequest, URLPattern } from "next/server";

export const routeApi = (
    name: keyof typeof RouterApi.routes,
    params?: { [key: string]: unknown }
) => {
    /** @ts-expect-error Generated ziggy config does not match the config interface */
    return routeFn(name, params, true, RouterApi);
};

export const route = (
    name: keyof typeof RouterFront.routes,
    params?: { [key: string]: unknown },
    absolute = false
) => {
    // try {
    /** @ts-expect-error Generated ziggy config does not match the config interface */
    let link = routeFn(name, params, absolute, RouterFront);

    if (!absolute) {
        link = `/${link}`.replace(/^\/{2,}/, "/");
    }

    return link;
    //     } catch {
    //         return `#${name}-not-found`;
    //     }
};

export type Route = {
    name: string;
    data: {
        uri: string;
        pattern: string;
        methods: string[];
        parameters?: string[];
        wheres?: { [key: string]: string };
        middleware?: string[];
        [key: string]: unknown;
    };
    pattern: URLPattern;
};

export type Routes = Route[];

export const routes = () => {
    const _routes = Object.entries(
        /** @ts-expect-error Generated ziggy config does not match the config interface */
        routeFn(undefined, undefined, undefined, RouterFront) as Router
    )[0]?.[1]?.routes;

    const routes: Routes = [];

    Object.entries(_routes).forEach((route) => {
        const routeData = route[1] as Route["data"];

        routes.push({
            name: route[0] as string,
            data: routeData,
            pattern: new URLPattern({
                pathname: routeData.pattern,
            }),
        });
    });

    return routes;
};

export const currentRoute = (request: NextRequest): Route | null => {
    const _routes = routes();
    const url = request.url.split("?")[0];

    for (let index = 0; index < _routes.length; index++) {
        const route = _routes[index];

        if (route.pattern.test(url)) {
            return route;
        }
    }

    return null;
};
