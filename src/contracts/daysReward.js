import web3 from "./web3";

const address = "0xAB3037FE6276284a5Dfed69Fe9d0A043Bf2Fa43F";
const abi = [

];
export default new web3.eth.Contract(abi, address);