import React,{useState,useEffect} from 'react'
import Title from './components/Title'
import "./App.css"
import { GlobalStyles, lightTheme, darkTheme } from "./components/globalStyles";
import {ThemeProvider} from "styled-components";
import  {DarkMode} from "./components/DarkMode";
import Toggle from "./components/Toggle"
import EditorComponent from './editor/editor';
import SidebarComponent from './sidebar/sidebar'
import firebase from 'firebase/app';
const App = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);  
  const [theme, toggleTheme] = DarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(()=>{
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        setNotes(notes);
      })
  },[])

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

  const deleteNote = async(note) => {
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter(_note => _note !== note));
    if(selectedNoteIndex === noteIndex) {

       setSelectedNoteIndex(null);
       setSelectedNote(null);
    }
    else{
      notes.length > 1 ?
      selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) : 
       setSelectedNoteIndex(null);
       setSelectedNote(null);
    }

    firebase.firestore().collection('notes').doc(note.id).delete();
  }



  const newNote = async(title) => {
    const note = {
      title: title,
      body: ''
    };
     
    const newFromDB = await firebase.firestore().collection('notes').add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    const newID = newFromDB.id;
    await setNotes({ notes: [...notes, note] });
    const newNoteIndex = notes.indexOf(notes.filter(_note => _note.id === newID)[0]);
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  }

  return (
    <ThemeProvider theme={themeMode}>
    <GlobalStyles/>
    <div className="App">
  <Toggle theme={theme} toggleTheme={toggleTheme}/>
 
   
      <Title/>
      </div>
      <div className="App_header">
      <SidebarComponent 
            selectedNoteIndex = {selectedNoteIndex}
            notes = {notes}
            deleteNote={deleteNote}
            selectNote = {selectNote}
            newNote={newNote}
            />
                {
        selectedNote ? 
          <EditorComponent 
          key = {selectedNoteIndex}
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes = {notes}
          noteUpdate = {noteUpdate}></EditorComponent>  :
        null
        }
      </div>
  </ThemeProvider> 
 
  )
 
}

export default App

