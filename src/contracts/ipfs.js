//imports the IPFS API
import IPFS from "ipfs-http-client";

/**
 * creates & exports new instance for
 * IPFS using infura as host, for use.
 */
const ipfs = new IPFS({
  // host: "ipfs.infura.io",
  host: "infura-ipfs.io",
  // host: "cloudflare-ipfs.com",
  // host:"ipfs.io",
  // host: "gateway.ipfs.io",
  // host: "localhost",
  // port: 5001,
  protocol: "https",
  // protocol: "http"
});
export default ipfs;
