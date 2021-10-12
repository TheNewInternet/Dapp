import "./Social.css";

import Post from "./Post";
import Feed from "./Feed";
import { created } from "../../api";
// import Create from "../../api"


const init = async ()=>{

  created();
  
}


init()
const Social = () => {

  return (<div>
            <h5 className="social-index">Decentralized Social Network</h5>
            <Post></Post>
            <Feed></Feed>
         </div>);
};



export default Social;
