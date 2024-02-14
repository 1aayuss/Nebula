import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/api/info",
    "/privacy",
    "/contact",
    "/terms",
  ],
  ignoredRoutes: [
    "/api/webhook",
    "/api/info",
    "/privacy",
    "/contact",
    "/terms",
  ],

  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      const dash = new URL("/dashboard", req.url);

      return NextResponse.redirect(dash);
    }
    return null;
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
