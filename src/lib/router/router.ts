import { route as routeFn, Router } from "ziggy-js";
import { Ziggy as RouterApi } from "@/lib/router/router-api";
import { Ziggy as RouterFront } from "@/lib/router/router-front";
import { URLPattern } from "urlpattern-polyfill/urlpattern";

export const linkApi = (
    name: keyof typeof RouterApi.routes,
    params?: { [key: string]: unknown }
) => {
    /** @ts-expect-error Generated ziggy config does not match the config interface */
    return routeFn(name, params, true, RouterApi) as string;
};

export type RouteName = keyof typeof RouterFront.routes;

export const link = (
    name: RouteName,
    params?: { [key: string]: unknown },
    absolute = false
) => {
    // try {
    /** @ts-expect-error Generated ziggy config does not match the config interface */
    let link = routeFn(name, params, absolute, RouterFront) as string;

    if (!absolute) {
        link = `/${link}`.replace(/^\/{2,}/, "/");
    }

    return link;
    //     } catch {
    //         return `#${name}-not-found`;
    //     }
};

export type Route = {
    name: RouteName;
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

export const getRoutes = () => {
    const _routes = Object.entries(
        /** @ts-expect-error Generated ziggy config does not match the config interface */
        routeFn(undefined, undefined, undefined, RouterFront) as Router
    )[0]?.[1]?.routes;

    const routes: Routes = [];

    Object.entries(_routes).forEach((route) => {
        const routeData = route[1] as Route["data"];
        const pattern = new URLPattern({
            pathname: routeData.pattern,
        });

        routes.push({
            name: route[0] as RouteName,
            data: routeData,
            pattern,
        });
    });

    return routes;
};

export const routes = getRoutes();

export const getRoute = (name: RouteName) => {
    return routes.find((route) => route.name === name);
};

export const routeExists = (name: string) => {
    return !!routes.find((route) => route.name === name);
};

export const getCurrentRoute = (url: string): Route | null => {
    url = url.split("?")[0];

    try {
        new URL(url);
    } catch {
        url = process.env.NEXT_PUBLIC_FRONT_URL + url;
    }

    for (let index = 0; index < routes.length; index++) {
        const route = routes[index];

        if (route.pattern.test(url)) {
            return route;
        }
    }

    return null;
};
