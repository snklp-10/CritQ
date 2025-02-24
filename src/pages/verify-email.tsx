import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (token) {
      fetch(`/api/auth/callback/verify-email?token=${token}`)
        .then((response) => {
          if (response.status === 200) {
            setStatus("success");
            // Redirect to login page after a delay
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          } else {
            setStatus("error");
          }
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && (
        <div>
          <p>Your email has been successfully verified!</p>
          <p>Redirecting to the login page...</p>
        </div>
      )}
      {status === "error" && (
        <div>
          <p>Invalid or expired verification link.</p>
          <p>Please try signing up again.</p>
        </div>
      )}
    </div>
  );
}
