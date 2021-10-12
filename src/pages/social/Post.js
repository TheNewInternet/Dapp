import React from "react"
import "./Post.css"
import {captureCaption, captureFile, handleOk} from "../../api"

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: 'Caption..'
    };

    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCaptionChange(event) {
    // this.setState({caption: event.target.value});
    captureCaption(event.target.value)
  }

  handlePhotoChange(event) {
    console.log(event.target.files[0])
    // this.setState({photo: event.target.files[0]});
    captureFile(event.target.files[0])
  }

  handleSubmit(event) {
    alert('An caption was submitted: ' + this.state.caption);
    event.preventDefault();
    handleOk();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Caption:
          <textarea id="caption" name="caption" onChange={this.handleCaptionChange} />
        </label>
        <label>
          Photo:
          <input type="file"  onChange={this.handlePhotoChange}></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default Post