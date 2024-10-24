import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { fetchUser } from "@/lib/data/auth";
import { Route, route } from "@/lib/router/router";
import { CustomMiddleware } from "@/lib/middleware/_chain";
import { hasMiddleware } from "@/middleware";

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
            const user = await fetchUser();

            if (!user) {
                return NextResponse.redirect(route("front.login", {}, true));
            }
        }

        return middleware(request, event, response);
    };
};
