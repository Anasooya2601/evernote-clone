import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
import {useDebounce} from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import "./styles.css";

import ReactQuill, { Quill } from "react-quill";
import { debounce } from "@material-ui/core";

const Editor = ({ classes }, props) => {
  const {
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
    selectedNoteIndex,
    setSelectedNoteIndex,
  } = props;
  const [text, setText] = useState(null);
  const [title, setTitle] = useState(null);
  const [id, setId] = useState(null);
  const Size = Quill.import("formats/size");
  const CustomToolbar = () => (
    <div id="toolbar">
      <select className="ql-font">
        <option value="arial" selected>
          Arial
        </option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium" selected>
          Size 3
        </option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
      <button className="ql-clean" />
      <button className="ql-insertHeart">
       
      </button>
    </div>
  );
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);
  // const updateBodyDebounce = Debounce(text, 1500);
  // const updateTitleDebounce = Debounce(title, 1500);

  // useEffect(() => {
  //   setTitle(selectedNote.title);
  // }, [selectedNote]);

  // useEffect(() => {
  //   setText(selectedNote.body);
  // }, [selectedNote]);

  // useEffect(() => {
  //   if (updateBodyDebounce) {
  //     firestore.collection("notes").doc(selectedNote.id).update({
  //       body: text,
  //     });
  //   }
  // }, [updateBodyDebounce]);

  // useEffect(() => {
  //   firestore.collection("notes").doc(selectedNote.id).update({
  //     title: title,
  //   });
  // }, [updateTitleDebounce]);

  // const updateNote = (e) => {
  //   setText(e);
  // };
  // const updateTitle = (e) => {
  //   setTitle(e.target.value);
  // };

  const updateBody = async (val) => {
    await setText(val);
    update();
  };

  const update = debounce(() => {
    console.log("Updating DB");
  }, 1500);

  return (
    <div className={classes.editorContainer}>
         <CustomToolbar />
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(Editor);