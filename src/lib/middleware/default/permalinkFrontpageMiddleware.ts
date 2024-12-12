import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Route, permalink } from "@cms/router";
import {
    CustomMiddleware,
    hasMiddleware,
    MiddlewareFactory,
    redirect,
} from "@cms/middleware";
import { fetchPageByPermalink } from "@/lib/data/pages";

const permalinkFrontpageMiddleware: MiddlewareFactory = (
    currentRoute: Route | null,
    middleware: CustomMiddleware
): CustomMiddleware => {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        if (hasMiddleware(currentRoute, "front:permalink:frontpage")) {
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

export default permalinkFrontpageMiddleware;
