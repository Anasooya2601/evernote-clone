import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import firestore from "../firebase/config";
import { debounce, Modal } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

function EditorComponent(props) {
    const [text, setText] = useState('');
    const [title, setTitle] = useState(props.selectedNote.title);
    const [id, setId] = useState(props.selectedNote.id);
    const classes = props;


    // const updateBody = async(val)=>{
    //       await setText(val);
    //       update();
    // };


    const updateBody = (val) => {
          props.noteUpdate(id, {
            title: title,
            body: val
          });
          
          setText(val);
          //console.log('this ',id)
    };
      
    const debounce = (func, delay) => {
          let timer;
      
          return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(null, args), delay);
          };
    };

    // const update = useRef(
  // 	debounce(() => {
  // 		props.noteUpdate(id,{
    //                   title:title,
    //                   body:text,
    //             })
    //             //console.log(props.selectedNote.body);
  // 	}, 1500)
    // ).current

    useEffect(()=>{
          setText(props.selectedNote.body);
          setTitle(props.selectedNote.title);
          setId(props.selectedNote.id);
          //console.log('this ',id)
    },[])



    useEffect(()=>{
          if(props.selectedNote.id !== id) {
          setText(props.selectedNote.body);
          setTitle(props.selectedNote.title);
          setId(props.selectedNote.id);
          //console.log('this is ', id)
          }
    },[])

    const updateTitle = async(txt) => {
          await setTitle(txt)
    }

  return (
      
          <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input className={classes.titleInput} placeholder='Note title....' value={title ? title : ''} onChange={(e) => updateTitle(e.target.value)}>
                </input>
                <ReactQuill
                style={{height:"50vh"}}
                      value = {text }
                      onChange={debounce(updateBody,4000 )}>

                </ReactQuill>

          </div>
    );
}

export default withStyles(styles) (EditorComponent) ;
// const Editor = ({ classes }, props) => {
//     const {
//       notes,
//       setNotes,
//       selectedNote,
//       setSelectedNote,
//       selectedNoteIndex,
//       setSelectedNoteIndex,
//     } = props;
//     const [text, setText] = useState(null);
//     const [title, setTitle] = useState(null);
//     const [id, setId] = useState(null);




//     const updateBody = async (val) => {
//         await setText(val);
//         update();
//       };

    
//       const update = debounce(() => {
//         console.log("Updating DB");
//       }, 1500);
//       const updateTitle = async (txt) => {
//         await setTitle(txt)
//         update();
//       };
     
//       return (
//         <div className={classes.editorContainer}>
//                            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
//                   <input className={classes.titleInput} placeholder='Note title....' value={title ? title : ''} onChange={(e) => updateTitle(e.target.value)}>
//                   </input>
//           <ReactQuill value={text} onChange={updateBody}></ReactQuill>
//         </div>
//       );
//     };
    
//     export default withStyles(styles)(Editor);
