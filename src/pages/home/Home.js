import "./Home.css";
import { addNetwork } from "../../api";
const Home = () => {
  return <div className="home-index">About
  <h1>Instagram on blockchain</h1>
  <h5>This project is still working in progress.</h5>
  <h5>Use it at your own risk.</h5>
  <button type="button" className="btn btn-xss btn-soft-light text-nowrap d-flex align-items-center mr-2" onClick={()=>{addNetwork()}} >
<img className="mr-1" width="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png" alt="Metamask"/> Add Instachain Network
</button>
  </div>;
};

export default Home;
