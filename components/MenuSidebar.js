import Searchbar from "./Searchbar";
import SignIn from "./SignIn";
import { useSession } from "next-auth/react";

function MenuSidebar(props) {
  const { data: session } = useSession();

  const handleRedirect = (route) => {
    props.handleRedirect(route);
  };

  return (
    <div
      className={`lg:hidden h-screen flex flex-col items-center z-50 fixed top-0 mt-16 pt-3 bg-blue-400 w-full duration-300 transition-all ${
        props.sidebar ? null : "translate-x-full"
      }`}
    >
      <div className="w-4/5">{session ? <Searchbar /> : null}</div>
      <div className="w-full flex flex-col items-center">
        <img
          src={session?.user.profilePictureUrl}
          height="200"
          className="my-5 w-4/5 rounded-none"
        />
        <h1 className="text-2xl font-bold underline mb-5">
          {session?.user.username}
        </h1>
        <ul className="text-center text-xl w-full flex flex-col pb-5 justify-around">
          <li
            onClick={() => handleRedirect("/profile")}
            className="py-2 hover:bg-blue-100 w-full cursor-pointer rounded-lg"
          >
            Profile
          </li>
          <li
            onClick={() => handleRedirect("/profile/settings")}
            className="py-2 hover:bg-blue-100 w-full cursor-pointer rounded-lg"
          >
            Settings
          </li>
          <li
            onClick={() => handleRedirect("/profile/change-password")}
            className="py-2 hover:bg-blue-100 w-full cursor-pointer rounded-lg"
          >
            Change Password
          </li>
          <li className="py-2 hover:bg-blue-100 w-full cursor-pointer rounded-lg">
            <SignIn />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuSidebar;
