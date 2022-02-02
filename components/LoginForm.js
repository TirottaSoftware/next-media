import Link from "next/link";
import { useState } from "react";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleSubmit(username, password);
  };

  return (
    <div className="flex flex-col">
      <form
        className="flex flex-col items-center bg-white rounded-2xl w-4/5 p-5 m-auto my-5 lg:w-2/5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold mb-3">Login</h1>
        <p className="text-center text-red-500">{props.errorMessage}</p>

        <input
          className="w-full outline-none shadow-md border shadow-gray-400 rounded-lg py-3 p-2 m-3 mt-8"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
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
          className="cursor-pointer p-2 py-3 text-xl outline-none rounded-xl m-2 bg-blue-400 w-full text-white"
          type="submit"
          value="Login"
        />
      </form>
      <label className="text-lg text-center">
        Don't have an account?
        <a className="ml-2 hover:text-blue-500 underline">
          <Link href="/signup">Click here to sign up</Link>
        </a>
      </label>
      <a className="self-center ml-2 text-lg hover:text-blue-500 underline">
        <Link href="/forgot-password">Forgot Password?</Link>
      </a>
    </div>
  );
}

export default LoginForm;
