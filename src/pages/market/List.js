import Item from "./Item";
import "./List.css";

const List = ({ listData, deleteData }) => {
  return (
    <div className="list-index">
      {listData.map((item) => {
        const { account, caption, image, id } = item;
        return (
          <Item
            key={id}
            itemId={id}
            itemAccount={account}
            itemCaption={caption}
            itemImage={image}
            deleteItemData={deleteData}
          />
        );
      })}
    </div>
  );
};

export default List;
