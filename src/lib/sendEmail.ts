import { Resend } from "resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyLink: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify email for CritQ",
      react: VerificationEmail({ username, verifyLink }),
    });
    return { success: true, message: "Verification email send sucessfully" };
  } catch (emailError) {
    console.error("🔴 Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
