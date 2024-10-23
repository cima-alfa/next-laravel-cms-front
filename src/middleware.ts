import { chain } from "@/lib/middleware/_chain";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { guestMiddleware } from "@/lib/middleware/guestMiddleware";
import { currentRoute, Route } from "@/lib/router/router";
import { type NextFetchEvent, NextRequest, NextResponse } from "next/server";

const middlewareChain = [guestMiddleware, authMiddleware];

const middleware = (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
) => chain(currentRoute(request), middlewareChain)(request, event, response);

export const hasMiddleware = (route: Route | null, middleware: string) => {
    return !!route?.data.middleware?.find(
        (_middleware) => _middleware === middleware
    );
};

export default middleware;

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
