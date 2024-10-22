import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const response = new NextResponse(null, {
        status: 204,
    });

    response.headers.append(
        "Set-Cookie",
        request.headers.get("X-Set-Cookie") ?? ""
    );

    return response;
}
