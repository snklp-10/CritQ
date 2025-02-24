import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConfig/db";
import UserModel from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;
  if (!token) {
    return res.redirect("/verify-email?status=error");
  }

  try {
    await dbConnect();

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.redirect("/verify-email?status=error");
    }

    user.isVerified = true;
    await user.save();

    // Redirect to the verification page
    return res.redirect("/verify-email?status=success");
  } catch (error) {
    console.error("Error in verification handler:", error);
    return res.redirect("/verify-email?status=error");
  }
}
