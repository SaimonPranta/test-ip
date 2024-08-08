
import React, { useEffect, useMemo } from "react";
import { useQuill } from "react-quilljs";
import Quill from "quill";
// import "quill/dist/quill.snow.css";
import "./quill.snow.css";


import { Modal, Button } from 'react-bootstrap'

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
  "12px",
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
];
// specify the fonts Name
var fonts = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Raleway",
  "PT Sans",
  "Merriweather",
  "Nunito Sans",
  "Prompt",
  "Abhaya Libre",
  "Alegreya",
  "Aleo",
  "Arapey",
  "Asap Condensed",
  "Assistant",
  "Barlow",
  "Bitter",
  "Poppins",
  "Caladea",
  "Rokkitt",
  "Enriqueta",
  "Bebas Neue",
];

var Size = Quill.import("attributors/style/size");

function TextEditorQuill({ setContent }) {
  //theme
  const theme = "snow";

  // font size
  Size.whitelist = fontSizeArr;
  Quill.register(Size, true);

  // embeded video resize

  // font array
  // let Fonts = Quill.import("attributors/style/font");
  // Fonts.whitelist = fontNames;
  // Quill.register(Fonts, true);

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
  // Font Family custome module make
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

  // Font Size custome module make
  fontSizeArr.forEach(function (font) {
    var fontSize = getFontName(font);
    fontStyles +=
      ".ql-snow .ql-picker.ql-size .ql-picker-label[data-value=" +
      fontSize +
      "]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=" +
      fontSize +
      "]::before {" +
      "content: '" +
      fontSize +
      "';!important";
  });

  var node = document.createElement("style");
  node.innerHTML = fontStyles;
  document.body.appendChild(node);

  var toolbarOptions = [
    // [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ font: fontNames }],
    [{ size: fontSizeArr }],
    // [{ font: [] }],
    [{ color: [] }, { background: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],

    [
      { list: "bullet" },
      { list: "ordered" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ['link', "image", "video"],

    // ["clean"],
  ];




  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
      handlers: {

        'link': function (value) {
          if (value) {
            var href = prompt('Enter the URL');
            // var href = modalFunction();
            this.quill.format('link', href);
          } else {
            this.quill.format('link', false);
          }
        }

      }
    },
    clipboard: {
      matchVisual: false,
    }
  }), [])



  let Fonts = Quill.import("attributors/style/font");
  Fonts.whitelist = fontNames;
  Quill.register(Fonts, true);


  // const  toolbarOptions1 = {
  //   handlers: {
  //     // handlers object will be merged with default handlers object
  //     'link': function(value) {
  //       if (value) {
  //         var href = prompt('Enter the URL');
  //         this.quill.format('link', href);
  //       } else {
  //         this.quill.format('link', false);
  //       }
  //     }
  //   }
  // }



  // const modules = {
  //   toolbar: toolbarOptions,
  //   clipboard: {
  //     matchVisual: false,
  //   },
  // };

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
    "align",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

 

  function selectLocalImage() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        console.warn("You could only upload images.");
      }
    };
  }

  function saveToServer(file) {
    const fd = new FormData();
    fd.append("image", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/upload/image", true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        // this is callback data: url
        const url = JSON.parse(xhr.responseText).data;
        insertToEditor(url);
      }
    };
    xhr.send(fd);
  }
  function insertToEditor(url) {
    // push image url to rich editor.
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image1", `http://localhost:9000${url}`);
  }
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setContent(quill.root.innerHTML); // Get innerHTML using quill
 
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
