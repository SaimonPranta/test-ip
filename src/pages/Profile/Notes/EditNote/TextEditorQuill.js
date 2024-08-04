// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import Quill from "quill";
import axios from "axios";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";

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
  "Rubik Beastly",
  "Enriqueta",
  "Bonheur Royale",
  "Bebas Neue",
];

//custome faont family
var CustomeFont = Quill.import("attributors/style/fontFamily");

var Size = Quill.import("attributors/style/size");

function TextEditorQuill({ EditedNoteId, NoteUserName, setContent, content, oldContent }) {

  const [commingData, setCommingData] = useState(oldContent.note);
  const [singlenote, setSinglenote] = useState({});




  // useEffect(() => {

  //     axios
  //       .get(`${BACKEND_URL}/profile/notes/${NoteUserName}/${EditedNoteId}`, {
  //         headers: userHeader(),
  //       })
  //       .then(({ data }) => {
  //         console.log("single note data into promise", data)
  //         setSinglenote(data);
  //         // setWorking(false);
  //       })
  //       .catch((err) => {
  //         // setWorking(false);
  //         console.log("err", )
  //       });

  // }, [EditedNoteId, NoteUserName,]);


  //theme
  const theme = "snow";

  // font size
  Size.whitelist = fontSizeArr;
  Quill.register(Size, true);

  //font family

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
    // [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: fontSizeArr }],
    [{ font: fontNames }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],

    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ font: [] }],
    ["link", "image", "video"],

    // ["clean"],
  ];
  // move to trash after eror
  // custome fonts

  let Fonts = Quill.import("attributors/style/font");
  Fonts.whitelist = fontNames;
  Quill.register(Fonts, true);

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
  // quill.clipboard.dangerouslyPasteHTML(oldContent);
  // Image section
  // Insert Image(selected by user) to quill
  // const insertToEditor = (url) => {
  //   const range = quill.getSelection();
  //   quill.insertEmbed(range.index, "image", url);
  // };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  // const saveToServer = async (file) => {
  //   const body = new FormData();
  //   body.append("file", file);

  //   const res = await fetch("Your Image Server URL", { method: "POST", body });
  //   insertToEditor(res.uploadedImageUrl);
  // };

  // Open Dialog to select Image File
  // const selectLocalImage = () => {
  //   console.log("File");
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = () => {
  //     const file = input.files[0];
  //     console.log("File", file);
  //     saveToServer(file);
  //   };
  // };

  function selectLocalImage() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files[0];
      // console.log("file :>> ", file);

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
      // quill.clipboard.dangerouslyPasteHTML(`${content}`);

      quill.clipboard.dangerouslyPasteHTML(`${content}`);
      quill.on("text-change", (delta, oldDelta, source) => {
        

        setContent(quill.root.innerHTML); // Get innerHTML using quill

        // Add custom handler for Image Upload
        // quill.getModule("toolbar").addHandler("image", () => {
        //   selectLocalImage();
        // });
        // console.log("toolbar");
      });
    }
  }, [quill, content]);

  React.useEffect(() => {
    if (quill) {
      // quill.clipboard.dangerouslyPasteHTML(`${content}`);
      // console.log("efect er data", commingData);
    }
  }, []);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={quillRef} />
      

    </div>
  );
}

export default TextEditorQuill;
