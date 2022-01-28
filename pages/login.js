import LoginForm from "../components/LoginForm";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (username, password) => {
    setErrorMessage("");
    if (!username || !password) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    signIn("credentials", { username, password, redirect: false }).then(
      (status) => {
        if (status.error) {
          setErrorMessage(status.error);
          return;
        }
        router.push("/feed");
      }
    );
  };

  return (
    <div>
      <LoginForm handleSubmit={handleSubmit} errorMessage={errorMessage} />
    </div>
  );
}

export default Login;

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
