import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import DeletePostModal from "../../components/DeletePostModal";
import Post from "../../components/Post";
import ProfileData from "../../components/ProfileData";

function profile({ user, posts }) {
  const router = useRouter();
  const [postToDelete, setPostToDelete] = useState({});
  const [modalState, setModalState] = useState(false);

  const openPost = (postId) => {
    router.push("/feed/" + postId);
  };

  const toggleDeleteModal = (postId, userId) => {
    setPostToDelete({ postId, userId });
    setModalState(!modalState);
  };

  const goToProfile = (authorId) => {
    router.push("/profile/" + authorId);
  };

  const likePost = (postId) => {
    axios
      .post("http://localhost:3000/api/likes", {
        postId,
        userId: user.id,
      })
      .then(() => {
        router.reload();
      });
  };

  const handleDelete = (postId) => {
    const userId = user.id;

    axios
      .delete(
        `http://localhost:3000/api/posts?userId=${userId}&postId=${postId}`
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          return;
        } else {
          router.reload();
        }
      });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <ProfileData user={user} />
      </div>
      <div className="flex">
        <div className="w-4/5 flex flex-col items-center mt-5 mx-auto">
          {modalState ? (
            <DeletePostModal
              toggleDeleteModal={toggleDeleteModal}
              handleDelete={handleDelete}
              postToDelete={postToDelete}
            />
          ) : null}
          <h1 className="text-3xl uppercase font-bold">My posts</h1>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                user={user}
                post={post}
                likePost={likePost}
                openPost={openPost}
                goToProfile={goToProfile}
                toggleDeleteModal={toggleDeleteModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  //http://localhost:3000/api/posts?uid=
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const user = await axios
    .get("http://localhost:3000/api/users/" + session?.user.id)
    .then((res) => {
      return res.data;
    });

  const posts = await axios
    .get(`http://localhost:3000/api/posts?uid=${session?.user.id}`)
    .then((res) => {
      return res.data;
    });

  return {
    props: {
      user: user,
      posts: posts,
    },
  };
}
