import web3 from "./contracts/web3";
import ipfs from "./contracts/ipfs";
import contract from "./contracts/contractInstance";
let account = "";
let buffer = "";
let caption = "";
let loading = false;

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
  loading = true;
  let imgHash;

  ipfs
    .add(buffer)
    .then((hashedImg) => {
      imgHash = hashedImg[0].hash;
      console.log(imgHash);
      return convertToBuffer(caption);
    })
    .then((bufferDesc) =>
      ipfs.add(bufferDesc).then((hashedText) => hashedText[0].hash)
    )
    .then((textHash) => {
      contract.methods
        .sendHash(imgHash, textHash)
        .send({ from: account }, (error, transactionHash) => {
          if (typeof transactionHash !== "undefined") {
            alert("Storing on Ethereum...");
            contract.once("NewPost", { from: account }, () => {
              getPosts();
              alert("Operation Finished! Refetching...");
            });
          }
          loading = false;
        });
    });
};

/**
 * validates if image & captions
 * are filled before submission.
 */
const handleOk = () => {
  //   console.log(_file)
  //   let _buffer = captureFile(_file);
  //   console.log(!_buffer)
  if (!buffer || !caption) {
    alert("Please fill in the information.");
  } else {
    onSubmit();
  }
};

const created = async () => {
  await updateAccount();
  await getPosts();
};

const updateAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  const _account = accounts[0];
  // this.currentAccount = account;
  account = _account;
  return _account;
};

const getPosts = async () => {
  loading = false;
  const posts = [];
  const counter = await contract.methods.getCounter().call({
    from: account,
  });

  console.log(counter);

  if (counter !== null) {
    const hashes = [];
    const captions = [];
    for (let i = counter; i >= 1; i -= 1) {
      hashes.push(
        contract.methods.getHash(i).call({
          from: account,
        })
      );
    }

    const postHashes = await Promise.all(hashes);

    for (let i = 0; i < postHashes.length; i += 1) {
      captions.push(
        fetch(`https://gateway.ipfs.io/ipfs/${postHashes[i].text}`).then(
          (res) => res.text()
        )
      );
    }

    const postCaptions = await Promise.all(captions);

    for (let i = 0; i < postHashes.length; i += 1) {
      posts.push({
        id: i,
        key: `key${i}`,
        caption: postCaptions[i],
        src: `https://gateway.ipfs.io/ipfs/${postHashes[i].img}`,
      });
    }

    //   this.currentPosts = posts;
    loading = false;
  }
  // console.log(posts)
  return posts;
};

export {
  getPosts,
  updateAccount,
  onSubmit,
  handleOk,
  captureFile,
  captureCaption,
  created,
};
