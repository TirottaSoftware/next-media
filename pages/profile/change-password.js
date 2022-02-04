import { getSession } from "next-auth/react";
import ChangePasswordForm from "../../components/ChangePasswordForm";
import { useState } from "react";
import axios from "axios";

function ChangePassword({ user }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const changePassword = (current, newPassword, confirmPassword) => {
    if (!current || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords must match");
      return;
    }
    axios
      .put(
        "https://next-media-90r4bujz9-tirottasoftware.vercel.appapi/users/change-password",
        {
          uid: user.id,
          currentPassword: current,
          newPassword,
          confirmNewPassword: confirmPassword,
        }
      )
      .then((res) => {
        if (res.data.error) {
          setErrorMessage(res.data.error);
          return;
        }
        setErrorMessage("");
        setSuccessMessage(res.data);
      });
  };

  return (
    <div className="flex">
      <ChangePasswordForm
        changePassword={changePassword}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </div>
  );
}

export default ChangePassword;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: {
      user: session?.user,
    },
  };
}
