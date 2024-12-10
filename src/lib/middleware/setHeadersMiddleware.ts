import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Route } from "@cms/router";
import { CustomMiddleware } from "@/lib/middleware";
import { fetchCsrf } from "@cms/fetch";
import { setCookies } from "@/lib/utils/cookies";

export const setHeadersMiddleware = (
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
