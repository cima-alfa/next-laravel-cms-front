import { type NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { Route } from "@cms/router";

export type CustomMiddleware = (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (
    currentRoute: Route | null,
    middleware: CustomMiddleware
) => CustomMiddleware;

export function chain(
    currentRoute: Route | null,
    functions: MiddlewareFactory[],
    index = 0
): CustomMiddleware {
    const current = functions[index];

    if (current) {
        const next = chain(currentRoute, functions, index + 1);

        return current(currentRoute, next);
    }

    return (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        return response;
    };
}

export const hasMiddleware = (
    route: Route | null,
    searchMiddleware: string
) => {
    return !!route?.data.middleware?.find(
        (routeMiddleware) => routeMiddleware === searchMiddleware
    );
};

export const redirect = (request: NextRequest, url: string, code = 307) => {
    if (request.headers.get("Accept") === "text/x-component") {
        return new NextResponse(null, {
            status: code,
            headers: {
                "X-Action-Redirect": url,
            },
        });
    }

    return NextResponse.redirect(url, code);
};
