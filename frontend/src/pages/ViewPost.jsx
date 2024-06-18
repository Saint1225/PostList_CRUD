import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import PostListHeader from "../components/PostListHeader";
import PostCard from "../components/PostCard";
import { getPost } from "../services/post";
import { useQuery } from "@tanstack/react-query";

const ViewPost = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams(0);
  const { showBoundary } = useErrorBoundary();

  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => getPost(postId),
  });

  // useEffect(() => {
  //   getPost(postId)
  //     .then((res) => {
  //       setPost(res.data);
  //     })
  //     .catch((error) => {
  //       showBoundary(error.message);
  //     });
  // }, [postId]);

  // Alternative with useQuery //
  useEffect(() => {
    postQuery.data && setPost(postQuery.data.data);
    postQuery.error && showBoundary(postQuery.error.message);
  }, [postQuery, showBoundary]);

  return (
    <div className="flex flex-col w-screen sm:w-3/5 mx-4">
      <PostListHeader isPostListPage={false} />
      <div className="flex flex-col">
        <PostCard key={postId} isViewPostPage={true} post={post} />
      </div>
    </div>
  );
};

export default ViewPost;
