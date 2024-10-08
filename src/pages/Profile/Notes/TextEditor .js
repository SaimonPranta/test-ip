// import React, { Component } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";

// export default class TextEditor extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   };

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     }); 
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea
//             style={{ display: "none" }}
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//         ></textarea>
//       </div>
//     );
//   }
// }
