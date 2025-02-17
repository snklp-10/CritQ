import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signInSchema } from "@/lib/validations/schemas";
import dbConnect from "@/lib/dbConfig/db";
import UserModel from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const { email, password } = signInSchema.parse(req.body);

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid password" });
    if (!user.isVerified)
      return res.status(403).json({ error: "Please verify your email first" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
