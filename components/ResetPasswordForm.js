import Link from "next/link";
import { useState } from "react";

function ResetPasswordForm(props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleSubmit(password, passwordConfirm);
  };

  return (
    <div className="flex flex-col">
      <form
        className="flex bg-white flex-col items-center rounded-2xl w-4/5 lg:w-2/5 p-5 m-auto my-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-3">Choose a new password</h1>
        <p className="text-center text-red-500">{props.errorMessage}</p>
        <input
          className="w-full outline-none shadow-md border shadow-gray-400 rounded-lg py-3 p-2 m-3 mt-8"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          placeholder="New Password"
        />
        <input
          className="w-full outline-none shadow-md border shadow-gray-400 rounded-lg py-3 p-2 m-3 "
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
          value={passwordConfirm}
          type="password"
          placeholder="Repeat New Password"
        />
        <input
          className="cursor-pointer p-2 py-3 text-xl rounded-xl m-2 bg-blue-400 w-full text-white"
          type="submit"
        />
      </form>
    </div>
  );
}

export default ResetPasswordForm;
