import CreatePostForm from "../components/CreatePostForm";
import { getSession } from "next-auth/react";

export default function Home() {
  return <div></div>;
}

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
    redirect: {
      permanent: true,
      destination: "/feed",
    },
  };
}
