import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import ProfileSettings from "../../components/ProfileSettings";

function Settings({ user }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const saveSettings = (username, email, profilePictureUrl, bio) => {
    if (!username && !email && !profilePictureUrl) {
      setErrorMessage("Please update at least one of the fields");
      return;
    }
    setErrorMessage("");
    axios
      .put(
        "https://next-media-cdre6hebu-tirottasoftware.vercel.app/api/users",
        {
          uid: user?.id,
          username,
          email,
          profilePictureUrl,
          bio,
        }
      )
      .then((res) => {
        if (res.error) {
          setErrorMessage(res.error);
          return;
        }
        setSuccessMessage(res.data);
      });
  };

  return (
    <div className="flex lg:flex-row flex-col">
      <ProfileSettings
        user={user}
        errorMessage={errorMessage}
        successMessage={successMessage}
        saveSettings={saveSettings}
      />
    </div>
  );
}

export default Settings;

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
