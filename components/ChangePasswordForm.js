import { useState } from "react";

function ChangePasswordForm(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.changePassword(currentPassword, newPassword, passwordConfirm);
  };

  return (
    <div className="w-full lg:w-2/5 px-5 mx-auto">
      <form
        className="flex bg-white rounded-lg flex-col items-center p-5 m-auto my-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold mb-3">Change Your Password</h1>
        <p className="text-center text-red-500">{props.errorMessage}</p>
        <p className="text-center text-green-600">{props.successMessage}</p>
        <input
          className="w-full shadow-md border outline-none shadow-gray-400 rounded-lg py-3 p-2 m-3 mt-8"
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
          type="password"
          placeholder="Current Password"
        />
        <input
          className="w-full shadow-md border outline-none shadow-gray-400 rounded-lg py-3 p-2 m-3"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          type="password"
          placeholder="New Password"
        />
        <input
          className="w-full shadow-md border outline-none shadow-gray-400 rounded-lg py-3 p-2 m-3 "
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
          type="password"
          placeholder="Confirm Password"
        />
        <input
          className="cursor-pointer p-2 py-3 text-xl rounded-xl m-2 bg-blue-400 w-full text-white"
          type="submit"
        />
      </form>
    </div>
  );
}

export default ChangePasswordForm;
