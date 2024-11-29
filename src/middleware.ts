import { chain } from "@/lib/middleware";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { guestMiddleware } from "@/lib/middleware/guestMiddleware";
import { permalinkFrontpageMiddleware } from "@/lib/middleware/permalinkFrontpageMiddleware";
import { rolesMiddleware } from "@/lib/middleware/rolesMiddleware";
import { setHeadersMiddleware } from "@/lib/middleware/setHeadersMiddleware";
import { getCurrentRoute } from "@/lib/router/router";
import { type NextFetchEvent, NextRequest, NextResponse } from "next/server";

const middlewareChain = [
    setHeadersMiddleware,
    permalinkFrontpageMiddleware,
    guestMiddleware,
    authMiddleware,
    rolesMiddleware,
];

const middleware = (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
) =>
    chain(getCurrentRoute(request.url), middlewareChain)(
        request,
        event,
        response
    );

export default middleware;

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
