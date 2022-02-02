import Link from "next/link";
import Searchbar from "./Searchbar";
import SignIn from "./SignIn";
import { useSession } from "next-auth/react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import MenuSidebar from "./MenuSidebar";
import { MenuAlt3Icon } from "@heroicons/react/outline";

function Navbar() {
  const { data: session } = useSession();
  const [profilePopupState, setProfilePopupState] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const router = useRouter();

  const handleRedirect = (route) => {
    setProfilePopupState(false);
    setSidebar(false);
    router.push(route);
  };

  return (
    <>
      <nav
        className={`bg-white shadow-2xl shadow-gray-200 w-full ${
          sidebar ? "fixed" : null
        } top-0 lg:relative p-2 mb-3 z-20`}
      >
        <ul className="flex justify-around items-center w-full text-xl">
          <Image
            src={logo}
            className="cursor-pointer"
            onClick={() => {
              handleRedirect("/feed");
            }}
            alt="LOGO"
            height="50px"
            width="200px"
          />
          {session ? (
            <button
              onClick={() => {
                setSidebar(!sidebar);
              }}
              className="lg:hidden flex flex-col justify-center items-center rounded-full bg-blue-400 text-white h-[40px] w-[40px]"
            >
              <MenuAlt3Icon width="30" height="30" />
            </button>
          ) : null}

          <li className="hidden lg:block w-1/5">
            {session ? <Searchbar /> : null}
          </li>
          <div className="hidden lg:flex items-center space-x-3">
            <li>
              <button onClick={() => setProfilePopupState(!profilePopupState)}>
                {session ? (
                  <img
                    src={session?.user.profilePictureUrl}
                    width="50"
                    height="50"
                    className="rounded-lg"
                  />
                ) : null}
              </button>
            </li>
          </div>
          {profilePopupState ? (
            <div className="mt-2 flex right-20 flex-col items-center absolute top-16 z-50 w-[300px] rounded-xl bg-white">
              <img
                src={session?.user.profilePictureUrl}
                width="200"
                height="200"
                className="rounded-lg my-5"
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
          ) : null}
        </ul>
      </nav>
      <MenuSidebar handleRedirect={handleRedirect} sidebar={sidebar} />
    </>
  );
}

export default Navbar;
