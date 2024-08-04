const React = require("react");
export default class AdsUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
    this.props.setSingleStory({
      ...this.props.singleStory,
      background: URL.createObjectURL(event.target.files[0]),
    });
    this.props.loadNewImage(event.target.files[0], "story");
  }
  render() {
    return (
      <div>
        <input
          style={{ display: "none" }}
          ref={this.props.fileInput}
          type="file"
          onChange={this.handleChange}
        />
        {/* <img src={this.state.file} /> */}
      </div>
    );
  }
}
