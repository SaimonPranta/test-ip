import React from "react";
import Draggable from "react-draggable";

class UserStoryPreview extends React.Component {
  eventLogger = (e, data) => {
    console.log("eventLogger: ", data);
  };
  handleDrag = (e, data) => {
    console.log("handleDrag: ", data);
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
          DraggableData={{
            node: HTMLElement,
            // lastX + deltaX === x
            x: this.props.textPositionX + this.props.textPositiondelX,
            y: this.props.textPositionY + this.props.textPositiondelY,
            deltaX: this.props.textPositiondelX,
            deltaY: this.props.textPositiondelY,
            lastX: this.props.textPositionX,
            lastY: this.props.textPositionY,
          }}
          defaultPosition={{
            x: 1080,
            y: 0,
          }}
          // position={{
          //   x: -200,
          //   y: this.props.textPositionY,
          // }}
          position={null}
          grid={[25, 25]}
          scale={1}
          disabled={false}
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
              fontFamily: this.props.singleStory.fontSize,
              color: this.props.singleStory.color,
              padding: "10px",
              height: "100vh",
              overflowY: "scroll",
              wordWrap: "break-word",
            }}
          >
            <div>{this.props.singleStory.title}</div>
       
          </div>
        </Draggable>
      </div>
    );
  }
}

export default UserStoryPreview;

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
