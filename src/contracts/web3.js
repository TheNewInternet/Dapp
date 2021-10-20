//imports the Web3 API
var Web3 = require("web3");
// let params = [
//   {
//     chainId: '0x26AD',
//     chainName: 'Instachain',
// //     nativeCurrency: {
// //         name: 'FTM',
// //         symbol: 'FTM',
// //         decimals: 18
// //     },
//     rpcUrls: ['http://66.228.52.222:8545'],
//     // blockExplorerUrls: ['https://ftmscan.com/']
// }]
// window.ethereum.request({ method: 'wallet_addEthereumChain', params })
//                     .then(() => console.log('Success'))
//                     .catch((error) => console.log("Error", error.message));

/**
 * creates & exports new instance for
 * Web3 using provided service by Metamask.
 */
 let currentWeb3 = new Web3('http://66.228.52.222:8545');;
//  (async () => {
//   await window.web3.ethereum.enable();
//  })();
// if (window.ethereum) {
//   let instance = new Web3(window.ethereum);
//   try {
//     // Request account access if needed
//     window.ethereum.enable();
//     // Acccounts now exposed
//     currentWeb3 = instance;
//   } catch (error) {
//     // User denied account access...
//     alert("Please allow access for the app to work");
//   }
// } else if (window.web3) {
//   currentWeb3 = new Web3(Web3.currentProvider);
//   // Acccounts always exposed
// } else {
//   console.log(
//     "Non-Ethereum browser detected. You should consider trying MetaMask!"
//   );
// }

export default currentWeb3;
