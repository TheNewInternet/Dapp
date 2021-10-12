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
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");

  function imageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
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
        {!isUploaded ? (
          <>
            <div className="folder">
              <input
                id="upload-input"
                className="order-img-input"
                type="file"
                accept=".jpg,.jpeg,.gif,.png"
                onChange={imageChange}
              />
              <label htmlFor="upload-input">
                <i className="fas fa-folder-open fa-10x folder-icon"></i>
              </label>
            </div>
          </>
        ) : (
          <div className="preview">
            {typeFile.includes("video") ? (
              <video
                className="preview-img"
                src={image}
                draggable={false}
                controls
                autoPlay
                alt="uploaded-img"
              />
            ) : (
              <img
                className="preview-img"
                id="uploaded-image"
                src={image}
                draggable={false}
                alt="uploaded-img"
              />
            )}
            <i
              className="fas fa-trash-alt fa-2x preview-dlt-icon"
              onClick={() => {
                setIsUploaded(false);
                setImage(null);
              }}
            />
          </div>
        )}
      </div>

      <button onClick={addItem} className="order-btn">
        Order
      </button>
    </div>
  );
};
export default Order;
