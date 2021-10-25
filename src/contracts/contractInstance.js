import Web3 from "./web3";

const address = "0x1B19C637384C3921B6557220a893001dA767B015";
const abi = [
	[
		{
			"anonymous": false,
			"inputs": [],
			"name": "NewPost",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "getCounter",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_index",
					"type": "uint256"
				}
			],
			"name": "getHash",
			"outputs": [
				{
					"internalType": "string",
					"name": "img",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "text",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "fileType",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_img",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_text",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_type",
					"type": "string"
				}
			],
			"name": "sendHash",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
];

export default new Web3.eth.Contract(abi, address);
