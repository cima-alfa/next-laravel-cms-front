import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Route } from "@cms/router";
import { CustomMiddleware, MiddlewareFactory } from "@cms/middleware";
import { fetchCsrf } from "@cms/fetch";
import { setCookies } from "@cms/cookies";

const setHeadersMiddleware: MiddlewareFactory = (
    currentRoute: Route | null,
    middleware: CustomMiddleware
): CustomMiddleware => {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        response ??= NextResponse.next();

        try {
            const cookies = (await fetchCsrf()).headers.getSetCookie();

            setCookies(cookies, response);
        } catch (error) {
            console.error("Get Renewed Cookies Error:", error);
        }

        return middleware(request, event, response);
    };
};

export default setHeadersMiddleware;
