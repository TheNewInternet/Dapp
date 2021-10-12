import { useState } from "react";
import { v4 } from "uuid";
import { useWallet } from "use-wallet";

import "./Order.css";

const Order = ({ add }) => {
  const wallet = useWallet();
  const account = wallet.account;

  const [caption, setCaption] = useState("Hello World !");
  function captionChange(e) {
    setCaption(e.target.value);
  }

  const [image, setImage] = useState("");
  function imageChange(e) {
    let reader = new FileReader();
    reader.onload = function (e) {
      setImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function addItem() {
    add(function (prevData) {
      return [
        ...prevData,
        {
          id: v4(),
          account,
          caption,
          image,
        },
      ];
    });
  }

  return (
    <div className="order-index">
      <div className="order-item">
        <span className="order-item-title">account</span>
        {wallet.status === "connected" ? (
          <div>{wallet.account}</div>
        ) : (
          <div> no connect </div>
        )}
      </div>
      <div className="order-item">
        <span className="order-item-title">caption</span>
        <input
          className="order-item-input"
          type="text"
          value={caption}
          onChange={captionChange}
        />
      </div>
      <div className="order-item">
        <span className="order-item-title">Image</span>

        <input
          className="order-item-input"
          type="file"
          accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
          onChange={imageChange}
        />
      </div>

      <button onClick={addItem} className="order-btn">
        Order
      </button>
    </div>
  );
};
export default Order;
