import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import firestore from "../firebase/config";
import { debounce, Modal } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'; 
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #fff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
     
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));
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
         <Modal>
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
      </Modal>
    </div>
  );
 

};

export default withStyles(styles)(Editor);