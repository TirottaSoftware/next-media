import axios from "axios";
import { HeartIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Comment from "../../components/Comment";
import AddCommentForm from "../../components/AddCommentForm";
import Error from "next/error";

function Post({ post, likes, comments, user }) {
  const [modalState, setModalState] = useState(false);
  const router = useRouter();

  const goToProfile = () => {
    router.push("/profile/" + post.author.id);
  };

  const handleSubmit = async (content) => {
    await axios
      .post(`http://localhost:3000/api/comments`, {
        postId: post.id,
        userId: user.id,
        content,
      })
      .then((res) => {
        console.log(res.data);
        router.reload();
      });
  };

  return (
    <div className="w-full lg:w-4/5 m-auto justify-center flex flex-col lg:flex-row my-10">
      <img
        src={post.imageUrl}
        className={post.imageUrl ? "lg:w-4/6 w-5/6 m-auto" : ""}
      />
      <div
        className={`${
          post.imageUrl ? "w-5/6 mx-auto lg:w-2/6" : "w-full"
        } + border rounded-lg p-5 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center space-x-3 py-3">
            <img
              className="rounded-full w-[75px] h-[75px]"
              src={post.author.profilePictureUrl}
            />
            <p
              onClick={goToProfile}
              className="cursor-pointer text-lg underline font-bold"
            >
              {post.author.username}
            </p>
          </div>
          <h1 className="text-xl mx-3">{post.title}</h1>
          <p className="mx-5 my-1 text-lg">{post.content}</p>
          <div className=" mt-3 flex w-full justify-between">
            <div className="flex">
              <HeartIcon className="text-red-500 mx-2 w-[25px] h-[25px]" />
              <p
                className=" cursor-pointer"
                onClick={() => setModalState(!modalState)}
              >
                {post.likes.length}
              </p>
            </div>
            <label className="text-gray-500">{post.createdAt}</label>
          </div>
          <div className="mt-5 overflow-y-scroll scrollbar scrollbar-thin h-40 lg:h-64 mb-3">
            {comments.map((comment) => {
              return <Comment user={comment.user} content={comment.content} />;
            })}
          </div>
        </div>
        <AddCommentForm handleSubmit={handleSubmit} />
      </div>
      {modalState ? (
        <div className=" absolute w-1/5 left-0 right-0 mx-auto top-32 min-h-[300px] py-3 bg-white shadow-inner shadow-gray-500 rounded-lg">
          <button
            onClick={() => setModalState(!modalState)}
            className="absolute right-3 top-3 rounded-full bg-red-500 w-[30px] h-[30px] text-white font-bold"
          >
            X
          </button>
          <h1 className="text-center text-xl">Liked by:</h1>
          {likes.map((like) => {
            return (
              <div className="flex px-5 items-center my-2" key={like.id}>
                <img
                  src={like.user.profilePictureUrl}
                  width="50"
                  height="50"
                  className="rounded-md"
                />
                <p className="px-2 font-semibold">{like.user.username}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Post;

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

  const comments = await axios
    .get(`http://localhost:3000/api/comments/${id}`)
    .then((res) => {
      return res.data;
    });

  const post = await axios
    .get("http://localhost:3000/api/posts/" + id)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return null;
    });

  if (!post) {
    return {
      redirect: {
        permanent: false,
        destination: "/feed",
      },
    };
  }

  const likes = await axios
    .get("http://localhost:3000/api/likes/" + id)
    .then((res) => {
      return res.data;
    });

  return {
    props: {
      post: post,
      likes: likes,
      comments: comments,
      user: session?.user,
    },
  };
}
