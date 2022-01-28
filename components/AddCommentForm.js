import Link from "next/link";
import { useState } from "react";

function AddCommentForm(props) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleSubmit(comment);
  };

  return (
    <div className="justify-self-end flex w-full">
      <form
        className="flex shadow-xl shadow-gray-400 rounded-xl items-center bg-white w-full p-2 m-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className=" w-4/5 p-2 px-3 m-3 bg-gray-100 outline-none rounded-lg"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <input
          className="rounded-lg cursor-pointer p-2 m-2 bg-blue-400 w-1/5 text-white"
          type="submit"
          value="Comment"
        />
      </form>
    </div>
  );
}

export default AddCommentForm;
