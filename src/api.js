import currentWeb3 from "./contracts/web3";
// import Web3 from "./contracts/web3";
import ipfs from "./contracts/ipfs";
import Contract from "./contracts/contractInstance";
import reward from "./contracts/reward.js";
import { v4 } from "uuid";

let account = "";
let key = "";
let buffer = "";
let caption = "";
let fileType = "";
let loading = false;

// window.localStorage.clear();
const init = async ()=>{
  account = await window.localStorage.getItem('account')
if (account!==undefined && account!=="" && account!==null){
 account = await window.localStorage.getItem('account')
//  key = await window.localStorage.getItem('account_pwd')
}else{
  account = await currentWeb3.eth.personal.newAccount("")
  
  // account = accountData['address']
  await window.localStorage.setItem('account', account)
  
  // key = accountData['privateKey']  
  // await window.localStorage.setItem('account_pwd', key)
}

console.log(`account: ${account}`)
let balance = await currentWeb3.eth.getBalance(account)
console.log(`balance: ${balance}`)

} 
(async () => {
  await init()
  await currentWeb3.eth.personal.unlockAccount(account, "", 0)
  // all of the script.... 
  await currentWeb3.eth.getGasPrice().then((result) => {
    console.log(currentWeb3.utils.fromWei(result, 'ether'))
    })
  
})();

// data variables
// const data = ()=>{
//   return {
//     buffer: '',
//     caption: '',
//   };
// }

/* used to catch chosen image &
 * convert it to ArrayBuffer.
 */
const captureFile = (file) => {
  const reader = new FileReader();
  if (typeof file !== "undefined") {
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      buffer = await convertToBuffer(reader.result);
    };
  } else buffer = "";
};

const captureFileType = (_fileType) => {
  fileType = _fileType;
};

const captureCaption = (_caption) => {
  caption = _caption;
};

/**
 * converts ArrayBuffer to
 * Buffer for IPFS upload.
 */
const convertToBuffer = async (reader) => {
  return Buffer.from(reader);
};

/**
 * submits buffered image & text to IPFS
 * and retrieves the hashes, then store
 * it in the Contract via sendHash().
 */
const onSubmit = async () => {
  alert("Uploading on IPFS...");
  console.log(loading)
  loading = true;
  let imgHash;

  await ipfs
    .add(buffer)
    .then((hashedImg) => {
      imgHash = hashedImg[0].hash;
      console.log(imgHash);
    })


    let bufferDesc = await  convertToBuffer(caption);
    let hashedText = await ipfs.add(bufferDesc)
    let textHash = hashedText[0].hash
    

    console.log(`fileType: ${fileType}`)
    let bufferType = await  convertToBuffer(fileType);
    console.log(`bufferType: ${bufferType}`)
    let hashedType = await ipfs.add(bufferType)
    let typeHash =  hashedType[0].hash
    console.log(`typeHash: ${typeHash}`)
    console.log(loading)
    console.log(typeof typeHash);
console.log(account)
// let balance = await currentWeb3.eth.getBalance(account)
// console.log(`balance: ${balance}`)

// currentWeb3.eth.personal.unlockAccount(account, "", 0).then(
//   console.log('Account unlocked!')
// )



    await  Contract.methods
        .sendHash(imgHash, textHash, typeHash)
        .send({ from: account ,
        //         gasLimit: currentWeb3.utils.toHex(42000),
        //         gasPrice: currentWeb3.utils.toHex(5000000)
              }, (error, transactionHash) => {
          console.log(`transactionHash: ${transactionHash}`)
          if (typeof transactionHash !== "undefined") {
            alert("Storing on Ethereum...");
            Contract.once("NewPost", { from: account }, () => {
              getPosts();
              alert("Operation Finished! Refetching...");
            });
          }
          loading = false;
        })
        console.log(loading)
      }
        

/**
 * validates if image & captions
 * are filled before submission.
 */
const handleOk = () => {
  //   console.log(_file)
  //   let _buffer = captureFile(_file);
  //   console.log(!_buffer)
  if (!buffer || !caption) {
    alert("Please fill in the media and caption.");
  } else {
    onSubmit();
  }
};

const created = async () => {
  // await updateAccount();
  await getPosts();
};

// const updateAccount = async () => {
//   const accounts = await Web3.eth.getAccounts();
//   const _account = accounts[0];
//   // this.currentAccount = account;
//   account = _account;
//   return _account;
// };

const getPosts = async () => {
  console.log(Contract.options.address)
  loading = false;
  const posts = [];
  const counter = await Contract.methods.getCounter().call(
    {
    from: account,
  }
  );

  console.log(counter);

  if (counter !== null) {
    const hashes = [];
    const captions = [];
    const types = [];
    for (let i = counter; i >= 1; i -= 1) {
      hashes.push(
        Contract.methods.getHash(i).call({
          from: account,
        })
      );
    }

    const postHashes = await Promise.all(hashes);

    for (let i = 0; i < postHashes.length; i += 1) {
      captions.push(
        fetch(`https://ipfs.io/ipfs/${postHashes[i].text}`).then(
          (res) => res.text()
        )
      );
    }


    for (let i = 0; i < postHashes.length; i += 1) {
      types.push(
        fetch(`https://ipfs.io/ipfs/${postHashes[i].fileType}`).then(
          (res) => res.text()
        )
      );
    }

    const postCaptions = await Promise.all(captions);
    const postFileType = await Promise.all(types);

    for (let i = 0; i < postHashes.length; i += 1) {
      posts.push({
        id: i,
        key: `key-${v4()}`,
        caption: postCaptions[i],
        fileType: postFileType[i],
        src: `https://ipfs.io/ipfs/${postHashes[i].img}`,
      });
    }

    //   this.currentPosts = posts;
    loading = false;
  }
  // console.log(posts)
  return posts;
};

var eth;
        var isTestnet = 'false';
// var ethereum = 
        async function addNetwork(type='web3') {

            // if (type === 'web3') {
            //     if (typeof window.ethereum !== 'undefined') {
            //         eth = await web3(window.ethereum);
            //     } else if (typeof web3 !== 'undefined') {
            //         eth = await web3(web3.givenProvider);
            //     } else {
            //         eth = await web3(window.ethereum);
            //     }
            // }
eth = currentWeb3.eth;
            if (typeof eth !== 'undefined') {
                var network = 0;
                console.log(await eth.net.getId())
                network = await eth.net.getId();
                let netID = network.toString();
                var params;
                if (isTestnet === "false") {
                    if (netID === "9901") {
                        alert("Instachain Network has already been added to Metamask.");
                        return;
                    } else {
                        params = [
                          {
                            chainId: '0x26AD',
                            chainName: 'Instachain',
                        //     nativeCurrency: {
                        //         name: 'FTM',
                        //         symbol: 'FTM',
                        //         decimals: 18
                        //     },
                            rpcUrls: ['http://66.228.52.222:8545'],
                            // blockExplorerUrls: ['https://ftmscan.com/']
                        }]
                    }
                } 
                // else {
                //     if (netID == "4002") {
                //         alert("Fantom Test Network has already been added to Metamask.");
                //         return;
                //     } else {
                //         params = [{
                //             chainId: '0xfa2',
                //             chainName: 'Fantom Testnet',
                //             nativeCurrency: {
                //                 name: 'FTM',
                //                 symbol: 'FTM',
                //                 decimals: 18
                //             },
                //             rpcUrls: ['https://rpc.testnet.fantom.network/'],
                //             blockExplorerUrls: ['https://testnet.ftmscan.com/']
                //         }]
                //     }
                // }

                window.ethereum.request({ method: 'wallet_addEthereumChain', params })
                    .then(() => console.log('Success'))
                    .catch((error) => console.log("Error", error.message));
            } else {
                alert('Unable to locate a compatible web3 browser!');
            }
        }

export {
  getPosts,
  // updateAccount,
  onSubmit,
  handleOk,
  captureFile,
  captureFileType,
  captureCaption,
  created,
  addNetwork,
};
