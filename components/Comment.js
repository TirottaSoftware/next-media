import Link from "next/link";

export default function Comment({ user, content }) {
  return (
    <div className="m-3 bg-white shadow-md shadow-gray-400 p-3 rounded-xl">
      <Link href={`/profile/${user.id}`}>
        <div className=" cursor-pointer flex items-center">
          <img
            src={user.profilePictureUrl}
            className="hover:opacity-60 rounded-full"
            width="50"
            height="50"
          />
          <h1 className="mx-2 hover:underline text-xl font-semibold">
            {user.username}
          </h1>
        </div>
      </Link>
      <div>
        <p className="pl-[60px]">{content}</p>
      </div>
    </div>
  );
}
