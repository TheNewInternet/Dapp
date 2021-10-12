import "./Item.css";

const Item = ({
  itemId,
  itemAccount,
  itemCaption,
  itemImage,
  deleteItemData,
}) => {
  function deleteItem() {
    deleteItemData(function (prev) {
      return prev.filter((item) => item.id !== itemId);
    });
  }

  return (
    <div className="item-index">
      <div className="item-index-item">
        <div>
          <div className="item-index-item">{itemAccount}</div>
          <div className="item-index-item">{itemCaption}</div>
          <div className="item-index-img-border">
            <img className="item-index-img" src={itemImage} alt="" />
          </div>
        </div>
      </div>
      <button onClick={deleteItem} className="item-delete-btn">
        <i class="fas fa-times item-delete-icon"></i>
      </button>
    </div>
  );
};
export default Item;
