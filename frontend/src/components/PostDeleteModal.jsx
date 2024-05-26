import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { deletePost } from "../services/post";
import SuccessModal from "./SuccessModal";

const PostDeleteModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  postId,
  setIsPostListUpdated,
}) => {
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const [deletedMessage, setDeletedMessage] = useState("");

  const { showBoundary } = useErrorBoundary();

  const handleDeleteButtonClicked = () => {
    deletePost(postId)
      .then((res) => {
        setIsDeleteModalOpen(false);
        setIsDeleteSuccessful(true);
        setDeletedMessage(res.data.message);
        setIsPostListUpdated(true);
        setTimeout(() => setIsDeleteSuccessful(false), 2000);
      })
      .catch((error) => {
        showBoundary(error.message);
      });
  };

  return (
    <>
      <Dialog
        open={isDeleteModalOpen}
        handler={() => setIsDeleteModalOpen(false)}
      >
        <DialogHeader>Delete Post</DialogHeader>
        <DialogBody>Proceed to delete this post?</DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            color="black"
            onClick={() => setIsDeleteModalOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="deep-orange"
            onClick={handleDeleteButtonClicked}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <SuccessModal
        isSuccessful={isDeleteSuccessful}
        message={deletedMessage}
      />
    </>
  );
};

export default PostDeleteModal;
