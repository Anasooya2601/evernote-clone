import React from 'react'
import EditorComponent from '../editor/editors';
const edit = () => {
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
