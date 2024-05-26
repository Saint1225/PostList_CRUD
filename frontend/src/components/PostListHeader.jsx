import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

const PostListHeader = ({
  isPostListPage,
  setIsEditModalOpen,
  setIsNewPost,
}) => {
  const { dispatchUserProfile } = useContext(UserContext);

  const navigate = useNavigate();

  const handleAddNewPostButton = () => {
    if (isPostListPage) {
      setIsEditModalOpen(true);
      setIsNewPost(true);
    } else navigate("/post");
  };

  const logoutButtonHandler = () => {
    dispatchUserProfile({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className="flex justify-between my-6 text-lg 2xs:text-xl">
        <button
          className="bg-yellow rounded-3xl py-1 px-3 2xs:py-1.5 2xs:px-5"
          onClick={handleAddNewPostButton}
        >
          {isPostListPage ? "Add New Post" : "Back"}
        </button>
        <button
          className="text-red text-xl 2xs:text-2xl"
          onClick={logoutButtonHandler}
        >
          Logout
        </button>
      </div>
      <h1 className="mx-auto mb-6 text-xl 2xs:text-2xl">
        {isPostListPage ? "Post List" : "View Post"}
      </h1>
    </>
  );
};

export default PostListHeader;
