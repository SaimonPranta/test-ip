import { IconButton } from "@material-ui/core";
import axios from "axios";
import React from "react";
import Draggable from "react-draggable";

class StoryPreview extends React.Component {
  eventLogger = (e, data) => {
  };
  handleDrag = (e, data) => {
    this.props.setTextPositionX(data.deltaX);
    this.props.setTextPositionY(data.deltaY);
    this.props.setTextPositiondelX(data.lastX);
    this.props.setTextPositiondelY(data.lastY);
  };
  state = {
    width: 200,
    height: 200,
  };

  render() {
    return (
      <div
        style={{
          fontSize: this.props.CustomeFontSize,
        }}
      >
        <Draggable
          className="handle"
          // DraggableData={{
          //   node: HTMLElement,
          //   // lastX + deltaX === x
          //   // x: this.props.textPositionX + this.props.textPositiondelX,
          //   // y: this.props.textPositionY + this.props.textPositiondelY,
          //   deltaX: -20,
          //   deltaY: 740,
          //   lastX: -20,
          //   lastY: 180,
          // }}
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          scale={1}
          // disabled={true}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          bounds={{ left: -20, top: -20, right: 740, bottom: 880 }}
          // bounds={{
          //   left: this.props.textPositionX,
          //   top: this.props.textPositionY,
          //   right: this.props.textPositiondelX,
          //   bottom: this.props.textPositiondelY,
          // }}
        >
          <div
            style={{
              fontSize: this.props.singleStory?.CustomeFontSize,
              fontFamily: this.props.CustomFont,
              color: this.props.singleStory.color,
              padding: "10px",
              height: "100vh",
              overflowY: "scroll",
              wordWrap: "break-word",
            }}
          >
            <div>{this.props.AddText}</div>
          </div>
        </Draggable>
      </div>
    );
  }
}
export default StoryPreview;

const ImageBreakPoint = () => {
  //  custone states
  const [selectImage, setSelectImage] = React.useState("");
  const [randomEvent, setRandomEvent] = React.useState(null);
  const [userName, setUserName] = React.useState(false);

  const randomEventHandler = () => {
    axios.put("/dynamic/Section").then((res, req) => {
    });
  };
  const clickHandeler = (e) => {};

  return (
    <>
      <section>
        <div style={{ width: "100%", height: "100%" }}>
          <div className="mainSection">
            
          </div>
          <IconButton
            onClick={(e) => {
              clickHandeler(e);
            }}
          >
            CLICK
          </IconButton>
        </div>
      </section>
    </>
  );
};

// backup story dragbale
{
  /* <div
  handle=".handle "
  style={{
    fontSize: this.props.CustomeFontSize,
  }}
>
  <Draggable
    handle=".handle "
    defaultPosition={{ x: 0, y: 0 }}
    position={null}
    grid={[25, 25]}
    scale={1}
    onStart={this.handleStart}
    onDrag={this.handleDrag}
    onStop={this.handleStop}
  >
    <Resizable
      style={(style, { overflow: "hidden", border: "1px solid white" })}
      defaultSize={{
        width: 200,
        height: 200,
      }}
    >
     
      <div
        className="handle"
        style={{
          fontFamily: this.props.CustomFont,
          color: this.props.colorData,
          padding: "10px",
        }}
      >
        {this.props.AddText}
        <div>
          <div>Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </div>
    </Resizable>
  </Draggable>
</div>; */
}
