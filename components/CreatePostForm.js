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

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    axios
      .post("http://localhost:3000/api/posts", {
        title,
        content,
        imageUrl,
        authorId: session?.user.id,
      })
      .then((res) => {
        router.reload();
      });
  };

  return (
    <div className="w-1/4 m-10 p-5 sticky top-10 h-full rounded-xl shadow-blue-400 shadow-2xl bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center p-5 m-auto "
        method="POST"
        action="http://localhost:3000/api/posts"
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
  );
}

export default CreatePostForm;
