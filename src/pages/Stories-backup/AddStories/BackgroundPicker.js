"use strict";

import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

import { IoColorPaletteOutline } from "react-icons/io5";
import { MdColorize } from "react-icons/md";

class BackgroundPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: "205",
      g: "105",
      b: "105",
      a: "100",
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
    // this.props.setColor({
    //   r: color.rgb.r,
    //   g: color.rgb.g,
    //   b: color.rgb,
    //   a: color.rgb.a,
    // });
    // console.log("Color :>> ", color.rgb);
    // this.props.setSingleStory({
    //   ...this.props.singleStory,
    //   BackgroundColor: {
    //     r: color.rgb.r,
    //     g: color.rgb.g,
    //     b: color.rgb,
    //     a: color.rgb.a,
    //   },
    // });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "45px",
          height: "45px",
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
        <div
          onClick={
            () =>
              this.props.setSingleStory({
                ...this.props.singleStory,
                // background: BackgroundColor,
                // backgroundColorBool: "true",
                // color: "red",
              })
            // console.log(this.props?.singleStory)
          }
          style={styles.swatch}
          onClick={this.handleClick}
        >
          <div style={styles.color}>
            <MdColorize style={{ fontSize: "25px", color: "white" }} />
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

export default BackgroundPicker;
