import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
	const token = request.cookies.get("jwt")?.value;

	const pathname = request.nextUrl.pathname;

	const isAuthPage =
		pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup");

	const isProtected =
		pathname.startsWith("/dashboard") ||
		pathname.startsWith("/cart") ||
		pathname.startsWith("/checkout");

	if (!token) {
		if (isProtected) {
			return NextResponse.redirect(new URL("/auth/signin", request.url));
		}

		return NextResponse.next();
	}

	try {
		await jwtVerify(token, secret);

		if (isAuthPage) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}

		return NextResponse.next();
	} catch {
		if (isProtected) {
			return NextResponse.redirect(new URL("/auth/signin", request.url));
		}

		return NextResponse.next();
	}
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/cart",
		"/checkout/:path*",
		"/auth/signin",
		"/auth/signup",
	],
};
