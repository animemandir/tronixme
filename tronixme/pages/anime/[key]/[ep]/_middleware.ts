import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { secret } = req.cookies;

    if (secret !== process.env.SECRET) {
        return NextResponse.redirect("/auth");
    }
}
