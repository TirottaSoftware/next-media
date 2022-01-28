import { useState } from "react";
import { signOut } from "next-auth/react";

function ProfileSettings(props) {
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    props.user.profilePictureUrl
  );
  const [bio, setBio] = useState(props.user.bio);

  const saveSettings = (e) => {
    e.preventDefault();

    props.saveSettings(username, email, profilePictureUrl, bio);
  };

  return (
    <>
      <div className="w-2/4 p-10">
        <form className="flex flex-col rounded-xl shadow-lg shadow-blue-400 bg-white items-center p-5 m-auto my-5">
          <h1 className="text-2xl mb-3">Edit Profile Information</h1>
          <p className="text-center text-red-500">{props.errorMessage}</p>
          <input
            className=" w-full p-2 m-3 border border-gray-300 rounded-lg"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder="Username"
          />
          <input
            className=" w-full p-2 m-3 border border-gray-300 rounded-lg"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            value={email}
          />
          <input
            className=" w-full p-2 m-3 border border-gray-300 rounded-lg"
            onChange={(e) => {
              setProfilePictureUrl(e.target.value);
            }}
            type="url"
            placeholder="Profile Picture Url"
            value={profilePictureUrl}
          />
          {profilePictureUrl ? (
            <img
              className="mt-3 mx-auto w-full p-5 rounded-2xl h-full"
              src={profilePictureUrl}
              alt="Picture Preview"
            />
          ) : null}
        </form>
      </div>
      <div className="w-2/4 p-10">
        <form className="flex bg-white flex-col items-center p-5 rounded-xl shadow-lg shadow-blue-400 m-auto my-5">
          <h1 className="text-2xl mb-3">Edit Bio</h1>
          <textarea
            onChange={(e) => setBio(e.target.value)}
            className="w-full outline-none border border-gray-300 rounded-xl p-2 m-3 resize-none"
            rows="6"
            value={bio}
          />
        </form>
        <button
          className="cursor-pointer p-2 rounded-lg bg-green-500 w-full text-white"
          onClick={saveSettings}
        >
          Save Settings
        </button>
        <p
          onClick={() => signOut()}
          className="cursor-pointer hover:underline text-center text-blue-600 mt-3"
        >
          {props.successMessage}
        </p>
      </div>
    </>
  );
}

export default ProfileSettings;
