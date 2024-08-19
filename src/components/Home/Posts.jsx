import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import usePosts from "../../hooks/usePosts";
import { useAccount } from "../../redux/auth/hooks";

const Posts = () => {
  const user = useAccount();
  const { loading, posts } = usePosts(user.following, user.uid);

  return (
    <div className="mt-8 flex flex-col gap-12">
      {loading
        ? [0, 1, 2, 3, 4, 5].map((item) => <PostSkeleton key={item} />)
        : posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;
