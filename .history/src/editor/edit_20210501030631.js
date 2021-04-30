import React from 'react'
import EditorComponent from '../editor/editors';
function edit  (){
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
