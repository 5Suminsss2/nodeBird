import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  // 처음 들어왔을 때 포스트 로드하기
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  // 스크롤 내려서 끝까지 갔을 때 다시 로드하기
  // scrollY: 얼마나 내렸는지
  // clientHeight: 화면 보이는 길이
  // scrollHeight: 총 길이
  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        console.log("success2", hasMorePosts, loadPostsLoading);
        // 로딩중일 때는 실행 x -> 로딩 끝나면 실행 o
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: mainPosts[mainPosts.length - 1].id,
          });

          console.log("success");
        }
      } else {
        console.log("failed");
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      // window.addEventListener할 때 항상 리턴하고 remove해야지 메모리에 안 쌓임
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </AppLayout>
  );
};

export default Home;
