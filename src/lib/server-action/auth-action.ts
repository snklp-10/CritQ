"use server";
import { FormSchema } from "../validations/schemas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../dbConfig/db";
import TempUserModel from "@/models/TempUser"; // Create a TempUser model
import UserModel from "@/models/User";
import { z } from "zod";
import { sendVerificationEmail } from "../sendEmail";

export async function actionLoginUser({
  username,
  email,
  password,
}: z.infer<typeof FormSchema>) {
  await dbConnect();

  const user = await UserModel.findOne({ email });
  if (!user) return { error: "Invalid email or password" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: "Invalid email or password" };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return { success: "Login successful", token };
}

export async function actionSignUpUser({
  username,
  email,
  password,
}: z.infer<typeof FormSchema>) {
  try {
    await dbConnect();
    const existingUser = await TempUserModel.findOne({ email });
    if (existingUser) return { error: "User already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);
    const tempUser = new TempUserModel({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await tempUser.save();

    // Generate verification token
    const token = jwt.sign({ userId: tempUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Create verification link
    const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyLink
    );
    if (!emailResponse.success) {
      return { error: "User registered but failed to send verification email" };
    }

    return {
      success: "User registered successfully. Verification email sent.",
    };
  } catch (error) {
    console.error("Error in actionSignUpUser:", error);
    return {
      error:
        "An error occurred during the signup process. Please try again later.",
    };
  }
}
