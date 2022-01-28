import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const router = useRouter();

  const goToProfile = (uid) => {
    setSearchTerm("");
    setFoundUsers([]);
    router.push("/profile/" + uid);
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);

    axios
      .get("http://localhost:3000/api/users?search=" + e.target.value)
      .then((res) => {
        setFoundUsers(res.data);
      });
  };

  return (
    <div>
      <input
        className="text-lg bg-gray-200 w-full py-2 rounded-lg px-5 outline-none"
        type="text"
        value={searchTerm}
        onChange={handleInput}
        placeholder="Search"
      />
      <div className="absolute flex flex-col pt-1 bg-white w-1/5 rounded-lg items-center">
        {foundUsers.length > 0
          ? foundUsers.map((user) => {
              return (
                <div
                  onClick={() => goToProfile(user.id)}
                  className="flex cursor-pointer hover:bg-blue-100 items-center rounded-lg pb-1 z-50 w-full "
                >
                  <img
                    src={user.profilePictureUrl}
                    className="w-[50px] h-[50px] rounded-lg mr-1"
                  />
                  <h2>{user.username}</h2>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
