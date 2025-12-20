import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // login / register / auth ko bypass
  const publicRoutes = ["/login", "/register", "/api/auth"];
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico).*)",
  ],
};

export default proxy;
