"use strict";

import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

import { IoColorPaletteOutline } from "react-icons/io5";
import { MdColorize } from "react-icons/md";

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: "0",
      g: "0",
      b: "0",
      a: "1",
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
    this.props.setCustomBackground(0);
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.props.setColor({ color: color.rgb });

    this.props.setSingleStory({
      ...this.props.singleStory,
      color: `rgba(${color.rgb.r} , ${color.rgb.g}, ${color.rgb.b},${color.rgb.a})`,
    });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "1px solid #e4e4e4!important",
          margin: "2px 4px",
          border: `1px solid rgba(${this.state.color?.r})`,
          // padding: "10px",
          // background: "rgb(133, 133, 133)",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        },
        swatch: {
          padding: "1px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,0)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color}>
            <MdColorize style={{ fontSize: "20px", color: "white" }} />
          </div>
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPicker;
