import { HeartIcon, TrashIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/solid";
import _ from "lodash";

export default function Post({
  user,
  post,
  toggleDeleteModal,
  openPost,
  likePost,
  goToProfile,
}) {
  return (
    <div
      className="bg-white flex flex-col w-3/5 border-gray-500 rounded-2xl m-5 p-5"
      key={post.id}
    >
      <div className="flex justify-between items-center">
        <div className="flex">
          <img
            src={post.author.profilePictureUrl}
            className="w-[50px] h-[50px] rounded-xl"
          />
          <div className=" flex flex-col items-start mx-3 justify-center">
            <label
              onClick={() => goToProfile(post.author.id)}
              className=" font-bold underline cursor-pointer text-lg"
            >
              {post.author.username}
            </label>
            <label className="text-gray-400 text-xs">
              {post.createdAt.slice(0, 10)}, {post.createdAt.slice(12, 16)}
            </label>
          </div>
        </div>
        {post.author.id == user.id ? (
          <button
            className="mr-3"
            onClick={() => toggleDeleteModal(post.id, user.id)}
          >
            <TrashIcon className="bg-red-500 rounded-full p-2 w-[45px] h-[45px] text-white" />
          </button>
        ) : null}
      </div>
      <button
        onClick={() => openPost(post.id)}
        className="cursor-pointer hover:underline text-3xl m-1 self-start"
      >
        {post.title}
      </button>
      <p className="m-2">{post.content}</p>
      <img className="w-full my-1 m-auto rounded-xl" src={post.imageUrl} />
      <div className="flex mt-2 items-center ">
        {_.find(post.likes, { userId: user.id }) ? (
          <SolidHeartIcon
            onClick={() => likePost(post.id)}
            className="cursor-pointer text-red-500 mx-2 w-[25px] h-[25px]"
          />
        ) : (
          <HeartIcon
            onClick={() => likePost(post.id)}
            className="cursor-pointer text-red-500 mx-2 w-[25px] h-[25px]"
          />
        )}
        {post.likes ? <p>{post.likes.length}</p> : <p>0</p>}
      </div>
    </div>
  );
}
