import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { fetchUser } from "@/lib/data/auth";
import { route } from "@/lib/router/router";
import { CustomMiddleware } from "@/lib/middleware/_chain";

export const isAuthenticated = (
    middleware: CustomMiddleware
): CustomMiddleware => {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        if (
            request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/register"
        ) {
            const user = await fetchUser();

            if (user) {
                return NextResponse.redirect(
                    route("front.cp.dashboard.index", {}, true)
                );
            }
        }

        return middleware(request, event, response);
    };
};
