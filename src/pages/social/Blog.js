const Blog = ({ blogCaption, blogImage }) => {
  return (
    <div className="item-index">
      <div className="item-index-item">
        <div>
          <div className="item-index-item">{blogCaption}</div>
          <div className="item-index-img-border">
            <img className="item-index-img" src={blogImage} alt="upload-img" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
