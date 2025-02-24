import { useEffect } from "react";
import { useRouter } from "next/router";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { status } = router.query;

  useEffect(() => {
    if (status === "success") {
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    }
  }, [status, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        {status === "loading" && (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Verifying your email...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg font-semibold text-gray-800 ">
              Your email has been successfully verified!
            </p>
            <p className="text-sm">Redirecting to the login page...</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="w-10 h-10 text-red-500" />
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">
              Invalid or expired verification link.
            </p>
            <p className="text-sm">Please try signing up again.</p>
            <Link
              href="/signup"
              className="mt-4 px-4 py-2 rounded-md transition"
            >
              Sign Up Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
