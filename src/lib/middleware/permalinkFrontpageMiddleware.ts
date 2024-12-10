import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Route, permalink } from "@cms/router";
import { CustomMiddleware, redirect } from "@/lib/middleware";
import { hasMiddleware } from "@/lib/middleware";
import { fetchPageByPermalink } from "@/lib/data/pages";

export const permalinkFrontpageMiddleware = (
    currentRoute: Route | null,
    middleware: CustomMiddleware
): CustomMiddleware => {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const matchPath =
            /\/((?!api|_next\/static|_next\/image|favicon\.ico|favicon\.svg|icon\.ico|icon\.svg|sitemap\.xml|robots\.txt).*)/.test(
                request.nextUrl.pathname
            );

        if (
            matchPath &&
            hasMiddleware(currentRoute, "front:permalink:frontpage")
        ) {
            if (currentRoute?.segments?.permalink) {
                const page = await fetchPageByPermalink(
                    currentRoute?.segments?.permalink
                );

                if (page?.meta.frontpage) {
                    return redirect(
                        request,
                        permalink(page, request.nextUrl.searchParams, true)
                    );
                }
            }
        }

        return middleware(request, event, response);
    };
};
