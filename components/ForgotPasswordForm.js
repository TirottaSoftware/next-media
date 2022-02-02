import Link from "next/link";
import { useState } from "react";

function ForgotPasswordForm(props) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleSubmit(email);
  };

  return (
    <div className="flex flex-col">
      <form
        className="flex flex-col items-center bg-white rounded-2xl w-4/5 p-5 m-auto my-5 lg:w-2/5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold mb-3">Forgot Password</h1>
        <label className="flex self-center text-lg text-center">
          Don't have an account?
          <p className="ml-2 hover:text-blue-500 underline">
            <Link href="/signup">Click here to sign up</Link>
          </p>
        </label>
        <p className="text-center text-red-500">{props.errorMessage}</p>
        <input
          type="email"
          className="w-full outline-none shadow-md border shadow-gray-400 rounded-lg py-3 p-2 m-3 mt-8"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          className="cursor-pointer p-2 py-3 text-xl rounded-xl m-2 bg-blue-400 w-full text-white"
          type="submit"
        />
      </form>
      <p className="text-center text-green-500">{props.successMessage}</p>
    </div>
  );
}

export default ForgotPasswordForm;
