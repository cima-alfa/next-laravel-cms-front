import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { fetchAuthenticated } from "@/lib/data/users";
import { Route, link } from "@cms/router";
import { CustomMiddleware, redirect } from "@/lib/middleware";
import { hasMiddleware } from "@/lib/middleware";

export const authMiddleware = (
    currentRoute: Route | null,
    middleware: CustomMiddleware
): CustomMiddleware => {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        if (hasMiddleware(currentRoute, "front:auth")) {
            const authenticated = await fetchAuthenticated();

            if (!authenticated) {
                return redirect(request, link("front.login", {}, true));
            }
        }

        return middleware(request, event, response);
    };
};
