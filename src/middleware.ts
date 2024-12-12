import { getRouteByUrl } from "@cms/router";
import { type NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { chain, MiddlewareFactory, middlewareChain } from "@cms/middleware";
import * as middlewareProvider from "@/middlewareProvider";

middlewareProvider.middlewareChain.map((middleware) => {
    const middlewareFn = middlewareProvider[
        middleware as keyof typeof middlewareProvider
    ] as unknown as MiddlewareFactory | undefined;

    if (middlewareFn !== undefined) {
        middlewareChain.push(middlewareFn);
    } else {
        console.error(
            `Middleware '${middleware}', defined in the middleware provider 'order', does not exist!`
        );
    }
});

const middleware = (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
) =>
    chain(getRouteByUrl(request.url), middlewareChain)(
        request,
        event,
        response
    );

export default middleware;

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|images|favicon.ico|favicon.svg|icon.ico|icon.svg|sitemap.xml|robots.txt).*)",
    ],
};
