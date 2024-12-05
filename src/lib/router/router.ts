import { route as routeFn, Router } from "ziggy-js";
import { Ziggy as RouterApi } from "@/lib/router/router-api";
import { Ziggy as RouterFront } from "@/lib/router/router-front";
import { URLPattern } from "urlpattern-polyfill/urlpattern";
import { Page } from "@/lib/data/pages";

export const FrontUrl = process.env.NEXT_PUBLIC_FRONT_URL;
export const ApiUrl = process.env.API_URL;

export const searchParamsToObject = (searchParams: URLSearchParams) => {
    const params: { [key: string]: unknown } = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};

export const linkApi = (
    name: keyof typeof RouterApi.routes,
    params?: { [key: string]: unknown } | URLSearchParams
) => {
    if (params instanceof URLSearchParams) {
        params = searchParamsToObject(params);
    }

    /** @ts-expect-error Generated ziggy config does not match the config interface */
    const link = routeFn(name, params, false, RouterApi) as string;

    return ApiUrl + link;
};

export type RouteName = keyof typeof RouterFront.routes;

export const link = (
    name: RouteName,
    params?: { [key: string]: unknown } | URLSearchParams,
    absolute = false
) => {
    if (params instanceof URLSearchParams) {
        params = searchParamsToObject(params);
    }

    // try {
    /** @ts-expect-error Generated ziggy config does not match the config interface */
    let link = routeFn(name, params, false, RouterFront) as string;

    link = `/${link}`.replace(/^\/{2,}/, "/");

    if (absolute) {
        link = FrontUrl + link;
    }
    console.log(link);
    return link;
    //     } catch {
    //         return `#${name}-not-found`;
    //     }
};

export const permalink = (
    page: Page,
    params?: { [key: string]: unknown } | URLSearchParams,
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
        RouterFront
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
