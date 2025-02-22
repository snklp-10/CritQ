import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/dbConfig/db";
import UserModel from "@/models/User";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const token = req.cookies.get("token");

  // Connect to the database
  await dbConnect();

  // Check if the user is authenticated
  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const user = await UserModel.findById(payload.userId);

      if (!user) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // If the user is not verified, redirect to the signup page with an error message
      if (!user.isVerified && req.nextUrl.pathname !== "/signup") {
        return NextResponse.redirect(
          new URL(
            "/signup?error_description=Email link is invalid or has expired",
            req.url
          )
        );
      }

      // If the user is authenticated and verified, allow access to the home
      if (req.nextUrl.pathname.startsWith("/home")) {
        return res;
      }

      // If the user is authenticated and tries to access login or signup page, redirect to the home
      if (["/login", "/signup"].includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/home", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    // If the user is not authenticated and tries to access the home, redirect to the login page
    if (req.nextUrl.pathname.startsWith("/home")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}
