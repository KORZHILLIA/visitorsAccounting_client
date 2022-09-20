import { useState, useEffect, useRef } from "react";
import Form from "./Form";
import PostsList from "./PostsList";
import shared from "../../shared";

const initialState = {
  query: "",
  posts: [],
  loading: false,
  error: null,
};

const HomePage = () => {
  const [state, setState] = useState(initialState);
  const { query, posts, loading, error } = state;
  const ref = useRef(null);
  console.log(ref);

  useEffect(() => {
    const getPosts = async (query) => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const posts = await shared.fetchPosts(query);
        setState((prevState) => ({ ...prevState, loading: false, posts }));
        ref.current = "1";
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: error.message,
        }));
      }
    };
    if (query) {
      getPosts(query);
    }
  }, [query]);

  const submitHandler = (query) => {
    setState((prevState) => {
      if (prevState.query !== query) {
        return { ...prevState, query };
      }
      return prevState;
    });
  };
  return (
    <>
      <h1>Home Page</h1>
      <Form onSubmit={submitHandler} />
      {loading && <p>...Loading...</p>}
      {posts.length === 0 && ref.current === "1" && "Sorry, no posts found"}
      <PostsList posts={posts} />
    </>
  );
};

export default HomePage;
