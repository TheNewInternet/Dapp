import React from "react";
import { useWallet } from "use-wallet";

import "./Connect.css";

const Connect = () => {
  const wallet = useWallet();
  const blockNumber = wallet.getBlockNumber();

  return (
    <>
      <div className="connect-index">
        <h1>
          Connect Wallet
        </h1>
        {wallet.status === "connected" ? (
          <>
            <div>
              <div className="connect-index-text">
                <div>Account: {wallet.account}</div>
                <div>Balance: {wallet.balance} WEI</div>
                <div>Type: {wallet.type}</div>
                <div>Network: {wallet.networkName}</div>
                <div>BlockNumber: {blockNumber}</div>
              </div>
            </div>
            <button className="cnt-wlt-btn" onClick={() => wallet.reset()}>
              Disconnect
            </button>
          </>
        ) : (
          <div>
            <div>
              <div className="connect-index-text">
                <div>Account: ----------</div>
                <div>Balance: ---------- WEI</div>
                <div>Type: ---------</div>
                <div>Network: ----------</div>
                <div>BlockNumber: ----------</div>
              </div>
            </div>
            <button className="cnt-wlt-btn" onClick={() => wallet.connect()}>
              Connect to MetaMask
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Connect;
