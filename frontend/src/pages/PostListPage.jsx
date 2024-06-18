import { useState, useContext, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import CounterCard from "../components/CounterCard";
import PostListHeader from "../components/PostListHeader";
import PostCard from "../components/PostCard";
import PaginationFooter from "../components/PaginationFooter";
import PostEditModal from "../components/PostEditModal.jsx";
import { UserContext } from "../store/UserContext.js";
import PostDeleteModal from "../components/PostDeleteModal.jsx";
import { getAllAccounts } from "../services/account.js";
import {
  getAdminPaginatedPosts,
  getUserPaginatedPosts,
} from "../services/post.js";

const PostListPage = () => {
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [newPageNumber, setNewPageNumber] = useState(1);
  const [postsData, setPostsData] = useState({});
  const [totalMyPosts, setTotalMyPosts] = useState(0);
  const [isFetchingPosts, setIsFetchingPosts] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewPost, setIsNewPost] = useState(true);
  const [selectedPost, setSelectedPost] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPostListUpdated, setIsPostListUpdated] = useState(false);
  const { role } = useContext(UserContext);
  const { showBoundary } = useErrorBoundary();

  // const fetchPostList = () => {
  //   setIsFetchingPosts(true);
  //   // get total post number and admin post list
  //   role === "admin" &&
  //     getAdminPaginatedPosts(newPageNumber)
  //       .then((res) => {
  //         setPostsData(res);
  //         setIsFetchingPosts(false);
  //       })
  //       .catch((error) => {
  //         setIsFetchingPosts(false);
  //         showBoundary(error.message);
  //       });

  //   // get my post number and list
  //   getUserPaginatedPosts(newPageNumber)
  //     .then((res) => {
  //       role === "user" && setPostsData(res);
  //       setTotalMyPosts(res.totalPosts);
  //       setIsFetchingPosts(false);
  //     })
  //     .catch((error) => {
  //       setIsFetchingPosts(false);
  //       showBoundary(error.message);
  //     });
  // };

  // useEffect(() => {
  //   fetchPostList();
  // }, [role, newPageNumber]);

  // useEffect(() => {
  //   if (isPostListUpdated) {
  //     fetchPostList();
  //     setIsPostListUpdated(false);
  //   }
  // }, [isPostListUpdated]);

  // useEffect(() => {
  //   if (role === "admin")
  //     // get all accounts number
  //     getAllAccounts()
  //       .then((res) => {
  //         setTotalAccounts(res?.data.accounts.length);
  //       })
  //       .catch((error) => {
  //         showBoundary(error.message);
  //       });
  // }, [role]);

  // Proved query data can be accessed as redux or useContext state //
  // const loginQuery = useQuery({
  //   queryKey: ["login"],
  // });
  // console.log(loginQuery);

  //*** Alternative with useQuery ***//
  const allPostQuery = useQuery({
    queryKey: ["allPosts", newPageNumber],
    placeholderData: keepPreviousData,
    queryFn: () => {
      setIsFetchingPosts(true);
      return getAdminPaginatedPosts(newPageNumber);
    },
    enabled: role === "admin",
  });

  const userPostQuery = useQuery({
    queryKey: ["userPosts", newPageNumber],
    placeholderData: keepPreviousData,
    queryFn: () => getUserPaginatedPosts(newPageNumber),
  });

  const accountQuery = useQuery({
    queryKey: ["allAccounts"],
    queryFn: getAllAccounts,
    enabled: role === "admin",
  });

  useEffect(() => {
    allPostQuery.data && setPostsData(allPostQuery.data);
    allPostQuery.error && showBoundary(allPostQuery.error.message);
    userPostQuery.data && role === "user" && setPostsData(userPostQuery.data);
    userPostQuery.data && setTotalMyPosts(userPostQuery.data.totalPosts);
    userPostQuery.error && showBoundary(userPostQuery.error.message);
    accountQuery.data && setTotalAccounts(accountQuery.data.accounts.length);
    accountQuery.error && showBoundary(accountQuery.error.message);

    setIsFetchingPosts(false);
  }, [role, allPostQuery, userPostQuery, accountQuery, showBoundary]);

  useEffect(() => {
    if (isPostListUpdated) {
      role === "admin" && allPostQuery.refetch(newPageNumber);
      userPostQuery.refetch(newPageNumber);
      setIsPostListUpdated(false);
    }
  }, [role, allPostQuery, userPostQuery, newPageNumber, isPostListUpdated]);

  return (
    <div className="flex flex-col w-screen lg:w-4/5 xl:w-3/5 mx-4">
      <PostListHeader
        isPostListPage={true}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsNewPost={setIsNewPost}
      />
      {role === "admin" && (
        <div className="grid grid-cols-3 gap-4 xs:gap-8 mb-4">
          <CounterCard
            cardTitle="Total Account"
            cardNumber={totalAccounts}
            backgroundColor="bg-skin"
          />
          <CounterCard
            cardTitle="Total Post"
            cardNumber={postsData?.totalPosts}
            backgroundColor="bg-red"
          />
          <CounterCard
            cardTitle="My Post"
            cardNumber={totalMyPosts}
            backgroundColor="bg-green"
          />
        </div>
      )}
      <div className="flex flex-col">
        {isFetchingPosts ? (
          <div className="flex flex-row justify-center">
            <Spinner className="text-white/75 h-20 w-20 m-8" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24">
            {postsData?.data?.map((post) => (
              <PostCard
                key={post.id}
                isViewPostPage={false}
                post={post}
                setIsEditModalOpen={setIsEditModalOpen}
                setIsNewPost={setIsNewPost}
                setSelectedPost={setSelectedPost}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            ))}
          </div>
        )}
        <PaginationFooter
          totalPages={postsData?.totalPages}
          setNewPageNumber={setNewPageNumber}
        />
      </div>
      <PostEditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isNewPost={isNewPost}
        post={selectedPost}
        setIsPostListUpdated={setIsPostListUpdated}
      />
      <PostDeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        postId={selectedPost?.id}
        setIsPostListUpdated={setIsPostListUpdated}
      />
    </div>
  );
};

export default PostListPage;
