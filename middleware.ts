import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import getUser from "./app/api/actions/getUser";

export default withAuth({
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/",
    newUser: "/profile",
  },
});

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};

// export { default } from "next-auth/middleware";
