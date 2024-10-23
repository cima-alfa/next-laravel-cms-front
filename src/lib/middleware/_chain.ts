import { type NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { Route } from "@/lib/router/router";

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
