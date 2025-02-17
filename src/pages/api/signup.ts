import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConfig/db";
import UserModel from "@/models/User";
import { sendVerificationEmail } from "@/lib/sendEmail";
import Jwt from "jsonwebtoken";
import { signUpSchema } from "@/lib/validations/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    await dbConnect();

    const { username, email, password } = signUpSchema.parse(req.body);

    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      rankingPoints: 0,
      createdAt: new Date(),
    });

    const verificationToken = Jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${verificationToken}`;

    await sendVerificationEmail(username, email, verificationUrl);

    return res.status(201).json({
      message:
        "User registered! PLease check your email to verify your account",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User registered! Please verify your email." });
  }
}
