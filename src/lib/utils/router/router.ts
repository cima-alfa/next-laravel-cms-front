import { route as routeFn, Router } from "ziggy-js";
import { RouterConfigApi, RouterConfigFront } from "@cms/router";
import { URLPattern } from "urlpattern-polyfill/urlpattern";
import { Page } from "@/lib/data/pages";

export const FrontUrl = process.env.NEXT_PUBLIC_FRONT_URL as string;
export const ApiUrl = process.env.API_URL as string;

export const searchParamsToObject = (searchParams: URLSearchParams) => {
    const params: { [key: string]: unknown } = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};

export type LinkParams = { [key: string]: unknown } | URLSearchParams;

export const linkApi = (
    name: keyof typeof RouterConfigApi.routes,
    params?: LinkParams
) => {
    if (params instanceof URLSearchParams) {
        params = searchParamsToObject(params);
    }

    /** @ts-expect-error Generated ziggy config does not match the config interface */
    const link = routeFn(name, params, false, RouterConfigApi) as string;

    return ApiUrl + link;
};

export type RouteName = keyof typeof RouterConfigFront.routes;

export const link = (
    name: RouteName,
    params?: LinkParams,
    absolute = false
) => {
    if (params instanceof URLSearchParams) {
        params = searchParamsToObject(params);
    }

    // try {
    /** @ts-expect-error Generated ziggy config does not match the config interface */
    let link = routeFn(name, params, false, RouterConfigFront) as string;

    link = `/${link}`.replace(/^\/{2,}/, "/");

    if (absolute) {
        link = FrontUrl + link;
    }

    return link;
    //     } catch {
    //         return `#${name}-not-found`;
    //     }
};

export const permalink = (
    page: Page,
    params?: LinkParams,
    absolute = false
) => {
    if (params instanceof URLSearchParams) {
        params = searchParamsToObject(params);
    }
    params ??= {};

    params.permalink = page.meta.frontpage ? "" : page.meta.permalink;

    // try {

    /** @ts-expect-error Generated ziggy config does not match the config interface */
    let link = routeFn(
        "front.page.permalink",
        params,
        false,
        RouterConfigFront
    ) as string;

    link = `/${link}`.replace(/^\/{2,}/, "/");

    if (absolute) {
        link = FrontUrl + link;
    }

    return link;
    //     } catch {
    //         return `#${name}-not-found`;
    //     }
};

export type RouteSegments = { [key: string]: string | undefined };

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
    segments?: RouteSegments;
};

export const getRoutes = () => {
    const _routes = Object.entries(
        /** @ts-expect-error Generated ziggy config does not match the config interface */
        routeFn(undefined, undefined, undefined, RouterConfigFront) as Router
    )[0]?.[1]?.routes;

    const routes: Route[] = [];

    if (_routes) {
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
    }

    return routes;
};

export const routes = getRoutes();

export const getRoute = (name: RouteName) => {
    return routes.find((route) => route.name === name);
};

export const routeExists = (name: string) => {
    return !!routes.find((route) => route.name === name);
};

export const getRouteByUrl = (url: string): Route | null => {
    url = url.split("?")[0];

    try {
        new URL(url);
    } catch {
        url = FrontUrl + url;
    }

    for (let index = 0; index < routes.length; index++) {
        const route = routes[index];

        if (route.pattern.test(url)) {
            route.segments = {};

            Object.entries(route.pattern.exec(url)?.pathname.groups ?? {}).map(
                (group) => {
                    if (route.data.wheres?.[group[0]] !== undefined) {
                        (route.segments as RouteSegments)[group[0]] = group[1];
                    }
                }
            );

            return route;
        }
    }

    return null;
};
