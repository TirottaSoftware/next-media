export default function DeletePostModal({
  handleDelete,
  toggleDeleteModal,
  postToDelete,
}) {
  return (
    <div className="fixed bg-gray-200 p-5 rounded-lg flex flex-col mx-auto bottom-[50%] left-0 right-0 w-1/5 items-center">
      Are you sure you want to delete this post?
      <div className="flex items-center justify-center space-x-5">
        <button
          onClick={() => handleDelete(postToDelete.postId, postToDelete.userId)}
          className="mt-1 bg-green-600 py-2 px-5 text-white rounded-full"
        >
          Confirm
        </button>
        <button
          onClick={toggleDeleteModal}
          className="mt-1 bg-red-600 py-2 px-5 text-white rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
