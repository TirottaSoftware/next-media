import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import DeletePostModal from "../../components/DeletePostModal";
import Post from "../../components/Post";
import ProfileData from "../../components/ProfileData";

export default function User({ user, isFollowed, currentUser }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [modalState, setModalState] = useState(false);
  const [postToDelete, setPostToDelete] = useState({});

  const openPost = (postId) => {
    router.push("/feed/" + postId);
  };

  const toggleDeleteModal = (postId, userId) => {
    setPostToDelete({ postId, userId });
    setModalState(!modalState);
  };

  const likePost = (postId) => {
    axios
      .post(
        "https://next-media-90r4bujz9-tirottasoftware.vercel.appapi/likes",
        {
          postId,
          userId: currentUser.id,
        }
      )
      .then(() => {
        router.reload();
      });
  };

  const handleDelete = (postId) => {
    const userId = user.id;

    axios
      .delete(
        `https://next-media-90r4bujz9-tirottasoftware.vercel.appapi/posts?userId=${userId}&postId=${postId}`
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

  const goToProfile = () => {
    router.push("/profile/" + user.id);
  };

  const followUser = () => {
    const followerId = session?.user.id;
    const followingId = user.id;

    axios
      .post(
        "https://next-media-90r4bujz9-tirottasoftware.vercel.appapi/follows",
        {
          followerId,
          followingId,
        }
      )
      .then((res) => {
        router.reload();
      });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full ">
        <ProfileData
          isFollowed={isFollowed}
          followUser={followUser}
          followButton={true}
          user={user}
        />
      </div>
      <div className="w-4/5 flex flex-col items-center mx-auto">
        {modalState ? (
          <DeletePostModal
            toggleDeleteModal={toggleDeleteModal}
            handleDelete={handleDelete}
            postToDelete={postToDelete}
          />
        ) : null}
        <h1 className="text-3xl uppercase font-bold p-5 text-center">
          {user.username}'s posts
        </h1>
        {user.posts.map((post) => {
          return (
            <Post
              key={post.id}
              user={currentUser}
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
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const user = await axios
    .get(
      "https://next-media-90r4bujz9-tirottasoftware.vercel.appapi/users/" + id
    )
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return null;
    });

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/feed",
      },
    };
  }
  let isFollowed = false;
  user.followers.map((f) => {
    if (f.followingId == session?.user.id) {
      isFollowed = true;
    }
  });

  return {
    props: {
      currentUser: session?.user,
      user,
      isFollowed,
    },
  };
}
