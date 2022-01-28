import { getSession } from "next-auth/react";
import axios from "axios";
import CreatePostForm from "../../components/CreatePostForm";
import { useRouter } from "next/router";
import _ from "lodash";
import { useState } from "react";
import Post from "../../components/Post";
import DeletePostModal from "../../components/DeletePostModal";

function Feed({ posts, user }) {
  const router = useRouter();
  const [modalState, setModalState] = useState(false);
  const [postToDelete, setPostToDelete] = useState({});

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

  const toggleDeleteModal = (postId, userId) => {
    setPostToDelete({ postId, userId });
    setModalState(!modalState);
  };

  const goToProfile = (authorId) => {
    router.push("/profile/" + authorId);
  };

  const openPost = (postId) => {
    router.push("/feed/" + postId);
  };

  const handleDelete = (postId, userId) => {
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
    <div className="relative w-screen flex">
      <CreatePostForm />
      {modalState ? (
        <DeletePostModal
          toggleDeleteModal={toggleDeleteModal}
          handleDelete={handleDelete}
          postToDelete={postToDelete}
        />
      ) : null}
      <div className="w-3/4 float-right p-5">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              user={user}
              post={post}
              likePost={likePost}
              openPost={openPost}
              toggleDeleteModal={toggleDeleteModal}
              goToProfile={goToProfile}
            />
          );
        })}
      </div>
    </div>
  );
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

  const posts = await axios
    .get(
      "http://localhost:3000/api/posts/following?currentUid=" + session?.user.id
    )
    .then((res) => {
      return res.data;
    });

  return {
    props: {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        author: post.author,
        createdAt: post.createdAt,
        likes: post.likes,
      })),
      user: session?.user,
    },
  };
}

export default Feed;
