import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Debounce from "../hooks/helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

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
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(Editor);