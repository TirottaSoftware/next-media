import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

function CreatePostForm() {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formHidden, setFormHidden] = useState(false);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    axios
      .post(
        "https://next-media-90r4bujz9-tirottasoftware.vercel.appapi/posts",
        {
          title,
          content,
          imageUrl,
          authorId: session?.user.id,
        }
      )
      .then(() => {
        router.reload();
      });
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-2/6 h-full lg:m-10">
      <button
        onClick={() => {
          setFormHidden(!formHidden);
        }}
        className="lg:hidden p-2 px-5 mb-3 rounded-full text-white text-xl bg-blue-400"
      >
        + New Post
      </button>
      {formHidden ? null : (
        <div className="w-5/6 mx-3 p-5 sticky top-10 rounded-xl shadow-blue-400 shadow-2xl bg-white">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center p-5 m-auto "
            method="POST"
            action="https://next-media-90r4bujz9-tirottasoftware.vercel.appapi/posts"
          >
            <h1 className="text-2xl mb-3 text-blue-800 font-bold">
              Create a new post
            </h1>
            <p className="text-red-400 text-center">{errorMessage}</p>
            <input
              className="text-blue-800 outline-none shadow-md shadow-blue-400 rounded-xl text-lg w-full p-2 m-3"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="text-blue-800 outline-none resize-none shadow-md shadow-blue-400 rounded-xl text-lg w-full p-2 m-3"
              rows="4"
              name="content"
              id="content"
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              className="text-blue-800 outline-none shadow-md shadow-blue-400 rounded-xl text-lg w-full p-2 m-3"
              type="url"
              name="imageUrl"
              id="imageUrl"
              placeholder="ImageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              className="cursor-pointer p-2 m-2 bg-blue-400 w-full rounded-xl text-white"
              type="submit"
            >
              Create Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreatePostForm;
