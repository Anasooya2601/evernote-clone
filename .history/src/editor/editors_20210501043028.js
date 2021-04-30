import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import firestore from "../firebase/config";
import { debounce, Modal } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
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