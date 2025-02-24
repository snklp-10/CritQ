import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConfig/db";
import TempUserModel from "@/models/TempUser";
import UserModel from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Invalid token" });
  }

  try {
    await dbConnect();

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET);
    const tempUser = await TempUserModel.findById(decoded.userId);

    if (!tempUser) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const newUser = new UserModel({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true,
      role: "user",
      rankingPoints: 0,
      createdAt: new Date(),
    });

    await newUser.save();
    await TempUserModel.findByIdAndDelete(tempUser._id);

    res.redirect("/?verified=true");
  } catch (error) {
    console.error("Error in verification handler:", error);
    res.status(400).json({ error: "Invalid token" });
  }
}
