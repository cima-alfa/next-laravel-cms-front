import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { fetchUser } from "@/lib/data/users";
import { Route, link } from "@cms/router";
import { CustomMiddleware, redirect } from "@/lib/middleware";
import { hasMiddleware } from "@/lib/middleware";

export const rolesMiddleware = (
    currentRoute: Route | null,
    middleware: CustomMiddleware
): CustomMiddleware => {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const user = await fetchUser();
        const to = link("front.cp.dashboard.index", {}, true);

        if (hasMiddleware(currentRoute, "front:owner")) {
            if (!user?.owner) {
                return redirect(request, to);
            }
        }

        return middleware(request, event, response);
    };
};
