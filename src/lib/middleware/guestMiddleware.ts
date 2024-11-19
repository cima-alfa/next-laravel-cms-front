import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { fetchAuthenticated } from "@/lib/data/auth";
import { Route, link } from "@/lib/router/router";
import { CustomMiddleware, redirect } from "@/lib/middleware";
import { hasMiddleware } from "@/lib/middleware";

export const guestMiddleware = (
    currentRoute: Route | null,
    middleware: CustomMiddleware
): CustomMiddleware => {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        if (hasMiddleware(currentRoute, "front:guest")) {
            const authenticated = await fetchAuthenticated();

            if (authenticated) {
                return redirect(
                    request,
                    link("front.cp.dashboard.index", {}, true)
                );
            }
        }

        return middleware(request, event, response);
    };
};
