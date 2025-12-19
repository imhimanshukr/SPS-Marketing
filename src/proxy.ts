import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

/**
 * Ye middleware/proxy function hai
 * iska kaam protected routes ko secure karna hai
 * agar user login nahi hai to use /login pe redirect kar dega
 */
const proxy = async (req: NextRequest) => {
  // current request ka path nikal rahe hain
  const { pathname } = req.nextUrl;

  /**
   * Ye wo routes hain jinko bina login ke access kar sakte hain
   * - login / register pages
   * - next.js internal files (_next)
   * - auth related APIs
   * - favicon
   */
  const publicRoutes = ["/login", "/register", "/api/auth"];

  /**
   * Agar current route public hai to request ko aage jaane dete hain
   */
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  /**
   * NextAuth ke JWT token ko request se nikal rahe hain
   * agar user login hai to token mil jayega
   */
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  /**
   * Agar token nahi mila
   * matlab user logged-in nahi hai
   */
  if (!token) {
    // login page ka URL bana rahe hain
    const loginUrl = new URL("/login", req.url);

    /**
     * callbackUrl ka use isliye hota hai
     * taaki login ke baad user wapas
     * isi original page pe redirect ho sake
     */
    loginUrl.searchParams.set("callbackUrl", req.url);

    // user ko login page pe redirect kar rahe hain
    return NextResponse.redirect(loginUrl);
  }

  /**
   * Agar token mil gaya
   * matlab user authenticated hai
   * to request ko allow kar dete hain
   */
  return NextResponse.next();
};

export const config = {
  matcher: [
    // Excludes static files, images, and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ]
};

export default proxy;
