import Link from "next/link";
import { useState } from "react";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleSubmit(username, email, password, passwordConfirm);
  };

  return (
    <div className="flex flex-col">
      <form
        className="flex flex-col items-center bg-white rounded-2xl w-2/5 p-5 m-auto my-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold mb-3">Create account</h1>
        <label className="text-lg text-center">
          Already have an account?
          <a className="ml-2 hover:text-blue-500 underline">
            <Link href="/login">Click here to sign in</Link>
          </a>
        </label>
        <p className="text-center text-red-500">{props.errorMessage}</p>
        <input
          className="w-full shadow-md border outline-none shadow-gray-400 rounded-lg py-3 p-2 m-3 mt-8"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <input
          className="w-full shadow-md border outline-none shadow-gray-400 rounded-lg py-3 p-2 m-3"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
        />
        <input
          className="w-full shadow-md border outline-none shadow-gray-400 rounded-lg py-3 p-2 m-3"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        />
        <input
          className="w-full shadow-md border outline-none shadow-gray-400 rounded-lg py-3 p-2 m-3"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
          type="password"
          placeholder="Confirm Password"
        />
        <button
          className="cursor-pointer p-2 py-3 text-xl rounded-xl m-2 bg-blue-400 w-full text-white"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
