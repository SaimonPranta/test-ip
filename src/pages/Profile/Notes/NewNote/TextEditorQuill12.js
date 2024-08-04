/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import Quill from "quill";

// lineheight
var Parchment = Quill.import("parchment");
var lineHeightConfig = {
  scope: Parchment.Scope.BLOCK,
  whitelist: [
    "1.0",
    "1.2",
    "1.5",
    "1.6",
    "1.8",
    "2.0",
    "2.4",
    "2.8",
    "3.0",
    "4.0",
    "5.0",
  ],
};
var lineHeightClass = new Parchment.Attributor.Class(
  "lineheight",
  "ql-line-height",
  lineHeightConfig
);
var lineHeightStyle = new Parchment.Attributor.Style(
  "lineheight",
  "line-height",
  lineHeightConfig
);
Parchment.register(lineHeightClass);
Parchment.register(lineHeightStyle);

const fontSizeArr = [
  "5px",
  "8px",
  "10px",
  "15px",
  "20px",
  "25px",
  "30px",
  "35px",
  "40px",
  "45px",
  "50px",
  "55px",
  "60px",
  "65px",
  "70px",
  "75px",
  "80px",
  "85px",
  "90px",
  "95px",
  "100px",
  "200px",
  "300px",
  "400px",
  // "500px",
];

var Size = Quill.import("attributors/style/size");

function TextEditorQuill({ setContent }) {
  // const { quillRef } = useQuill();

  // undefined > Quill Object
  // { current: undefined } > { current: Quill Editor Reference }
  const theme = "snow";
  // const theme = 'bubble';

  Size.whitelist = fontSizeArr;
  Quill.register(Size, true);

  // var toolbarOptions = [[{ size: fontSizeArr }]];

  // const quillFont = new Quill("#quillElementSelector", {
  //   modules: {
  //     toolbar: toolbarOptions,
  //   },

  // });

  // specify the fonts you would
  var fonts = ["Arial", "Courier", "Garamond", "Tahoma", "Times", "Verdana"];
  // generate code friendly names
  function getFontName(font) {
    return font.toLowerCase().replace(/\s/g, "-");
  }
  function getFontSize(font) {
    return font;
  }
  var fontNames = fonts.map((font) => getFontName(font));
  var fontSizes = fontSizeArr.map((font) => getFontSize(font));
  // add fonts to style
  var fontStyles = "";
  fonts.forEach(function (font) {
    var fontName = getFontName(font);
    fontStyles +=
      ".ql-snow .ql-picker.ql-font .ql-picker-label[data-value=" +
      fontName +
      "]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=" +
      fontName +
      "]::before {" +
      "content: '" +
      font +
      "';" +
      "font-family: '" +
      font +
      "', sans-serif;" +
      "}" +
      ".ql-font-" +
      fontName +
      "{" +
      " font-family: '" +
      font +
      "', sans-serif;" +
      "}";
  });
  fontSizeArr.forEach(function (font) {
    var fontSize = getFontName(font);
    // console.log("ok", font);
    // console.log(fontSize, "ok");
    fontStyles +=
      ".ql-snow .ql-picker.ql-size .ql-picker-label[data-value='" +
      fontSize +
      "]::before, .ql-snow .ql-picker.ql-size .ql-picker-item" +
      fontSize +
      "::before {" +
      "content: '" +
      fontSize +
      "';!important";
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  });

  var node = document.createElement("style");
  node.innerHTML = fontStyles;
  // node.innerHTML = fontSizes;
  document.body.appendChild(node);

  // headerStringArray.forEach(function (header) {
  //   const getFOntName = null;
  //   var header = getFOntName(header);
  //   header.styles +=
  //     "ql.header .ql-picker.ql-size .ql-picker-label[data-value='" +
  //     header +
  //     "]:before, .ql-snow .ql-picker.ql-size .ql-picker-item" +
  //     "::before {" +
  //     "';!important";
  // });

  var toolbarOptions = [
    // [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: fontSizeArr }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    // [{ font: fontNames }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
    // ["clean"],
  ];
  let Fonts = Quill.import("attributors/style/font");
  Fonts.whitelist = fontNames;
  Quill.register(Fonts, true);

  // var Font = Quill.import("formats/font");
  // Font.whitelist = fontNames;
  // Quill.register(Font, true);

  const modules = {
    toolbar: toolbarOptions,

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const placeholder = "Compose an epic...";

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];
  // const CQuill = window.Quill || Quill;

  // var Parchment = CQuill.imports.parchment;
  // const config = {
  //   scope: Parchment.Scope.BLOCK,
  //   whitelist: ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6"],
  // };
  // var lineHtClass = new Parchment.Attributor.Class(
  //   "lineheight",
  //   "ql-line-height",
  //   config
  // );
  // var lineHtStyle = new Parchment.Attributor.Style(
  //   "lineheight",
  //   "line-height",
  //   config
  // );

  // Parchment.register(lineHtClass);
  // Parchment.register(lineHtStyle);

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        // setEditorText(quill.root.innerHTML); // Get innerHTML using quill
        setContent(quill.root.innerHTML); // Get innerHTML using quill

        // Add custom handler for Image Upload
        // quill.getModule("toolbar").addHandler("image", selectLocalImage);
      });
    }
  }, [quill, setContent]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={quillRef} />
    </div>
  );
}

export default TextEditorQuill;
