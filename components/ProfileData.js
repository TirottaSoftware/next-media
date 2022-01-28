function ProfileData({ user, followButton, followUser, isFollowed }) {
  return (
    <div className="flex items-center flex-col p-10 border-b-2">
      <div className="flex items-start mb-10">
        <img
          className="w-80 h-80 border-8 border-blue-400 rounded-full"
          src={user.profilePictureUrl}
          alt="profile picture"
        />
        <div className="flex flex-col space-y-2 items-start m-8">
          <h1 className="text-3xl underline font-bold mt-3 mb-3">
            {user.username}
          </h1>
          <p className=" rounded-xl text-2xl">{user.email}</p>
          <p className=" rounded-xl text-xl">{user.bio}</p>
          <div className="mb-3 border p-3 w-full rounded-xl border-gray-400 flex items-center justify-center space-x-5">
            {followButton ? (
              <button
                onClick={followUser}
                className={`text-lg rounded-xl text-white  px-5 py-1 ${
                  isFollowed ? "bg-red-400" : "bg-blue-400"
                }`}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            ) : null}
            <p className="text-lg">followers: {user.followers.length}</p>
            <p>following: {user.following.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileData;
