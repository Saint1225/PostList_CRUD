import { useNavigate } from "react-router-dom";
import pwg_logo from "../assets/pwg_logo.jpeg";

const PostCard = ({
  isViewPostPage,
  post,
  setIsEditModalOpen,
  setIsNewPost,
  setSelectedPost,
  setIsDeleteModalOpen,
}) => {
  const buttonGeneralStyle = "rounded-2xl py-1 px-4 w-20";

  const navigate = useNavigate();

  const tagContainer = (tag, index) => {
    return (
      <div key={index} className=" bg-skin rounded-3xl px-3 py-1 mr-2 mb-2">
        {tag}
      </div>
    );
  };

  const handleEditButton = () => {
    setIsEditModalOpen(true);
    setSelectedPost(post);
    setIsNewPost(false);
  };

  const handleViewButton = (id) => {
    navigate(`${id}`);
  };

  const handleDeleteButton = () => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`flex flex-col justify-top items-center mt-6 rounded-lg bg-white overflow-hidden ${
        isViewPostPage && "pb-16"
      }`}
    >
      <img
        src={pwg_logo}
        className="w-16 -rotate-[30deg] translate-y-2 ml-auto"
      />
      <h2 className="text-lg mx-4 mt-3">{post?.title}</h2>
      <div className="h-1/2">
        <p className="px-5 my-4 line-clamp-5">{post?.body}</p>
      </div>
      <div className="flex flex-row flex-wrap mr-auto ml-4 mb-4">
        {post?.tags && post?.tags.map((tag, index) => tagContainer(tag, index))}
      </div>
      {isViewPostPage ? null : (
        <div className="flex flex-row justify-between gap-3 mb-4 mt-auto">
          <button
            className={`bg-green ${buttonGeneralStyle}`}
            onClick={handleEditButton}
          >
            Edit
          </button>
          <button
            className={`bg-yellow ${buttonGeneralStyle}`}
            onClick={() => handleViewButton(post?.id)}
          >
            View
          </button>
          <button
            className={`bg-red ${buttonGeneralStyle}`}
            onClick={handleDeleteButton}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
