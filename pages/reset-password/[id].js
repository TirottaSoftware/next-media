import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import ResetPasswordForm from "../../components/ResetPasswordForm";

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const id = router.query.id;

  const handleSubmit = (password, passwordConfirm) => {
    setErrorMessage("");

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords must match");
      return;
    }

    axios
      .patch(
        "https://next-media-cdre6hebu-tirottasoftware.vercel.app/api/reset",
        { id, password }
      )
      .then((res) => {
        if (res.data.error) {
          if (res.data.error == "Invalid request.") {
            router.push("/forgot-password");
          }
          setErrorMessage(res.data.error);
          return;
        }
        router.push("/login");
      });
  };

  return (
    <ResetPasswordForm
      errorMessage={errorMessage}
      handleSubmit={handleSubmit}
    />
  );
}
