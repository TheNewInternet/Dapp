import "./Feed.css";
import { v4 } from "uuid";
import { useState } from "react";
import Post from "./Post";

import { getPosts, updateAccount } from "../../api";

function Blog(props) {

  const content = props.posts.map((post) => (
    // <div className="blog-index-item">{post.fileType}</div>
    <div className="blog-index">
      <div key={v4()}>
       {post.fileType.startsWith("video") ? (
        <video src={post.src} alt="" className="blog-index-img" controls/>):(
        <img src={post.src} alt="" className="blog-index-img" />)}
        <div className="blog-index-img-border">
          <div className="blog-index-item">{post.caption}</div>
        </div>
      </div>
    </div>
  ));
  return <div>{content}</div>;
}

let posts = [];

const getList = async () => {
  posts = await getPosts();
};
getList();

const Feed = () => {
  return (
    <div className="feed-index">
      <Post />
      <Blog posts={posts} />
    </div>
  );
};

export default Feed;
