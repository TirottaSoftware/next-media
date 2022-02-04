import SignUpForm from "../components/SignUpForm";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";

function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (username, email, password, passwordConfirm) => {
    setErrorMessage("");

    if (!username || !password || !passwordConfirm || !email) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords must match");
      return;
    }

    axios
      .post(
        "https://next-media-cdre6hebu-tirottasoftware.vercel.app/api/users",
        {
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        }
      )
      .then((res) => {
        if (res.data.error) {
          setErrorMessage(res.data.error);
          return;
        } else {
          signIn("credentials", { username, password });
        }
      });
  };

  return (
    <div>
      <SignUpForm handleSubmit={handleSubmit} errorMessage={errorMessage} />
    </div>
  );
}

export default Signup;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/feed",
      },
    };
  }
  return {
    props: {},
  };
}
