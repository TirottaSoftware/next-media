import axios from "axios";
import { useState } from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (email) => {
    setErrorMessage("");
    setSuccessMessage("");
    axios
      .post(
        "https://next-media-cdre6hebu-tirottasoftware.vercel.app/api/forgot",
        { email }
      )
      .then((res) => {
        if (res.data.error) {
          setErrorMessage(res.data.error);
        }
        setSuccessMessage("Email sent.");
      });
  };

  return (
    <ForgotPasswordForm
      errorMessage={errorMessage}
      successMessage={successMessage}
      handleSubmit={handleSubmit}
    />
  );
}
