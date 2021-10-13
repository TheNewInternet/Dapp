import React from "react";
import "./Post.css";
import { captureCaption, captureFile, handleOk } from "../../api";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "Caption..",
    };

    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCaptionChange(event) {
    // this.setState({caption: event.target.value});
    captureCaption(event.target.value);
  }

  handlePhotoChange(event) {
    console.log(event.target.files[0]);
    // this.setState({photo: event.target.files[0]});
    captureFile(event.target.files[0]);
  }

  handleSubmit(event) {
    alert("An caption was submitted: " + this.state.caption);
    event.preventDefault();
    handleOk();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="post-index">
        <label className="post-item">
        <i class="fas fa-pen post-item-title"/>
          <textarea
            id="caption"
            name="caption"
            className="post-textarea"
            onChange={this.handleCaptionChange}
          />
        </label>
        <label className="post-item">
          <div className="folder">
            <input
              type="file"
              id="upload-input"
              accept=".jpg,.jpeg,.gif,.png"
              //className="post-img-input"
              onChange={this.handlePhotoChange}
            />
            <label htmlFor="upload-input">
              <i className="fas fa-folder-open fa-10x folder-icon"></i>
            </label>
          </div>
        </label>
        <input type="submit" value="Submit" className="post-submit-btn" />
      </form>
    );
  }
}
export default Post;
