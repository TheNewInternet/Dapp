import "./Feed.css";

import {getPosts, updateAccount} from "../../api"


function Blog(props) {
  const content = props.posts.map((post) =>
    <div key={post.key}>
      <img src={post.src}/>
      <p>{post.caption}</p>
    </div>
  );
  return (
    <div>
      {content}
    </div>
  );
}

let posts = [];

const getList = async ()=>{

  posts = await getPosts();
  
}
getList()
const Feed = () => {
  
  return (<div>
            <div className="feed-index">Feed
              <Blog posts={posts} />
            </div>
            
          </div>);
};

export default Feed;
