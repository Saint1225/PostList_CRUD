import { useEffect, useRef, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { createPost, editPost } from "../services/post";
import SuccessModal from "./SuccessModal";

const PostEditModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  isNewPost,
  post,
  setIsPostListUpdated,
}) => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const animatedComponents = makeAnimated();
  const { showBoundary } = useErrorBoundary();
  const tagsOptions = [
    { value: "history", label: "history" },
    { value: "american", label: "american" },
    { value: "crime", label: "crime" },
    { value: "science", label: "science" },
    { value: "fiction", label: "fiction" },
    { value: "fantasy", label: "fantasy" },
    { value: "space", label: "space" },
    { value: "adventure", label: "adventure" },
    { value: "nature", label: "nature" },
    { value: "environment", label: "environment" },
    { value: "philosophy", label: "philosophy" },
    { value: "psychology", label: "psychology" },
    { value: "health", label: "health" },
  ];

  const titleInputRef = useRef();
  const contentTextareaRef = useRef();
  const tagsSelectRef = useRef();

  useEffect(() => {
    if (isEditModalOpen && !isNewPost && post) {
      titleInputRef.current.value = post.title;
    }
  }, [isEditModalOpen, isNewPost, post]);

  const handleTitleInput = (e) => {
    titleInputRef.current.value = e.target.value;
  };

  const handleContentTextareaInput = (e) => {
    contentTextareaRef.current.value = e.target.value;
  };

  const transformTagsArrayToOptions = (tags) => {
    const tagsOptions = tags.map((tag) => ({ value: tag, label: tag }));
    return tagsOptions;
  };

  const transformTagsOptionsToArray = (tags) => {
    const tagsArray = tags ? tags.map((tag) => tag.value) : [];
    return tagsArray;
  };

  const handleSubmitButtonClicked = () => {
    const postPayload = {
      title: titleInputRef.current.value,
      body: contentTextareaRef.current.value,
      tags: transformTagsOptionsToArray(tagsSelectRef.current.props.value),
    };
    if (isNewPost) {
      createPost(postPayload)
        .then((res) => {
          setIsEditModalOpen(false);
          setIsSubmitSuccessful(true);
          setSubmittedMessage(res.message);
          setIsPostListUpdated(true);
          setTimeout(() => setIsSubmitSuccessful(false), 2000);
        })
        .catch((error) => {
          showBoundary(error.message);
        });
    } else {
      editPost(post.id, postPayload)
        .then((res) => {
          setIsEditModalOpen(false);
          setIsSubmitSuccessful(true);
          setSubmittedMessage(res.data.message);
          setIsPostListUpdated(true);
          setTimeout(() => setIsSubmitSuccessful(false), 2000);
        })
        .catch((error) => {
          showBoundary(error.message);
        });
    }
  };

  return (
    <>
      <Dialog
        open={isEditModalOpen}
        size="md"
        handler={() => setIsEditModalOpen(false)}
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              {isNewPost ? "Add new post" : "Edit post"}
            </Typography>
          </DialogHeader>
        </div>
        <DialogBody>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Title
            </Typography>
            <Input
              label="title"
              inputRef={titleInputRef}
              onInput={handleTitleInput}
              defaultValue={isNewPost ? "" : post.title}
            />
            <Textarea
              label="content"
              defaultValue={isNewPost ? "" : post.body}
              ref={contentTextareaRef}
              onInput={handleContentTextareaInput}
            />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Tags
            </Typography>
            <Select
              ref={tagsSelectRef}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={tagsOptions}
              defaultValue={
                isNewPost ? "" : transformTagsArrayToOptions(post.tags)
              }
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="black"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="deep-orange"
            onClick={handleSubmitButtonClicked}
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
      <SuccessModal
        isSuccessful={isSubmitSuccessful}
        message={submittedMessage}
      />
    </>
  );
};

export default PostEditModal;
