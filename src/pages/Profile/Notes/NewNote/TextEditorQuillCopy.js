import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import Quill from "quill";
import "../style.scss";

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

function TextEditorQuill({ EditedContentHandler }) {
  // const { quillRef } = useQuill();

  // undefined > Quill Object
  // { current: undefined } > { current: Quill Editor Reference }
  const theme = "snow";
  // const theme = 'bubble';

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

    fontStyles +=
      ".ql-snow .ql-picker.ql-size .ql-picker-label[data-value='" +
      fontSize +
      "]::before, .ql-snow .ql-picker.ql-size .ql-picker-item" +
      fontSize +
      "::before {" +
      "content: '" +
      fontSize +
      "';!important";
  });

  var node = document.createElement("style");
  node.innerHTML = fontStyles;
  document.body.appendChild(node);

  var toolbarOptions = [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: fontSizeArr }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,

    clipboard: {
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
  ];

  const { quill, quillRef } = useQuill({
    theme,
    formats,
    modules,
    placeholder,
  });

  // Image  related handler
  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("Your Image Server URL", { method: "POST", body });
    insertToEditor(res.uploadedImageUrl);
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        // setEditorText(quill.root.innerHTML); // Get innerHTML using quill
        EditedContentHandler(quill.root.innerHTML); // Get innerHTML using quill

        // Add custom handler for Image Upload
        quill.getModule("toolbar").addHandler("image", selectLocalImage);
      });
    }
  }, [quill]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={quillRef} />
    </div>
  );
}

export default TextEditorQuill;
