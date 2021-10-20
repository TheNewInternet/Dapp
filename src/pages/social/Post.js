import React from "react";
import "./Post.css";
import { captureCaption, captureFile, captureFileType, handleOk } from "../../api";

class Post extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   caption: "Caption..",
    // };

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
    captureFileType(event.target.files[0].type);
  }

  handleSubmit(event) {
    // alert("An caption was submitted: " + this.state.caption);
    event.preventDefault();
    handleOk();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="post-index">
        <label className="post-item">
          <i className="fas fa-pen post-item-title" />
          <textarea
            id="caption"
            name="caption"
            className="post-textarea"
            onChange={this.handleCaptionChange}
          />
        </label>
        <label htmlFor="upload-input" className="post-textarea">
              <i className="fas fa-folder-open fa-2x folder-icon" id="fasfo"></i>
            </label>
            <br/>
        <input type="submit" value="Submit" className="post-submit-btn" />

          <div className="folder">
            <input
              type="file"
              id="upload-input"
              accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
              //className="post-img-input"
              onChange={this.handlePhotoChange}
              hidden
            />

          </div>
      </form>
    );
  }
}
export default Post;
