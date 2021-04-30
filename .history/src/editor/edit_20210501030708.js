import React ,{useState, useEffect} from 'react';
import firebase from 'firebase/app';
import "firebase/auth"
import EditorComponent from '../editor/editors';
function edit  (){
    const [selectedNote, setSelectedNote] = useState(null);
    const [notes, setNotes] = useState(null);
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null); 
    const auth = firebase.auth()
    const selectNote = (note, index) => {
        setSelectedNote(note);
        setSelectedNoteIndex(index);
      }
    
      const noteUpdate = (id, noteObj) => {
        firebase
          .firestore()
          .collection('notes')
          .doc(id)
          .update({
            title: noteObj.title,
            body: noteObj.body,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
        //console.log('the ID is: ',id);
      }
    return (
        <div>
           <EditorComponent 
          key = {selectedNoteIndex}
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes = {notes}
          noteUpdate = {noteUpdate}>📔</EditorComponent> 
        </div>
    )
}

export default edit
