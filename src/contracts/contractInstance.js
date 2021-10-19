import Web3 from "./web3";

const address = "";
const abi = [
	
];

export default new Web3.eth.Contract(abi, address);
