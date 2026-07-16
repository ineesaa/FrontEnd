import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/trips/:path*",
    "/favorites/:path*",
    "/statistics/:path*",
    "/profile/:path*",
  ],
};
