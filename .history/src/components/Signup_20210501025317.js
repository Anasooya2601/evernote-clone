import React ,{useState, useEffect} from 'react';
import firebase from 'firebase/app';
import "firebase/auth"
import '../App.css';
import gram1 from './gram2.svg'
import { makeStyles } from '@material-ui/core/styles'; 
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import EditorComponent from '../editor/editors';
import SidebarComponent from '../sidebar/sidebar'
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
function Signup () {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null); 
  const auth = firebase.auth()
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const classes = useStyles();
  const [modalStyle] =useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user,setUser]=useState(null);
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
  useEffect(()=>
  {
  const unsubscribe =  auth.onAuthStateChanged((authUser)=>
   {
     if(authUser)
     {
         console.log(authUser);
         setUser(authUser);
     }
     else{
       setUser(null);
     }
   });
   return () =>
   {
     unsubscribe();
   }
  },[user,username]);
  const signup = ((event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>
    {
      return authUser.user.updateProfile({displayName:username})
    })
    .catch((error)=>{alert(error.message)});
    setOpen(false);
    setEmail('');
    setPassword('');
    setUsername('');
  });
  const signIn = ((event)=>
  {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message));
    setOpenSignIn(false);
    setEmail('');
    setPassword('');
  }
  );

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
    <div   >
    <Modal
   
        open={open}
        onClose={()=>setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
        <img className="app__headerImage" src={gram1} alt=""/>
        </center>
        <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />
        <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Button  className={classes.margin}  size="medium" variant="contained" variant="contained" color="secondary" type="submit" onClick={signup}>Signup</Button>
        </form>
        </div>
      </Modal>
      <Modal
     
     
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
        <img className="app__headerImage" src={gram1} alt=""/>
        </center>
        <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <Button  className={classes.margin}  size="medium" variant="contained" color="secondary" type="submit" onClick={signIn}>Login</Button>
        </form>
        </div>
      </Modal>
     
      <div className="app___header"> 
        {user ? 
      (

      <Button  size="small" variant="contained" color="secondary" onClick={()=>auth.signOut()}>Logout</Button>
      ) : 
      (
      <div className="app__logincontainer">
        
      <Button className={classes.margin} size="small" variant="contained" color="primary" onClick={()=>setOpenSignIn(true)}>Login</Button>
      <Button className={classes.margin} size="small" variant="contained" color="primary"  onClick={()=>setOpen(true)}>SignUp</Button>
      </div>
   
      )
      }       
      </div>
      {user?.displayName ? 
      (<div>
      <SidebarComponent 
            selectedNoteIndex = {selectedNoteIndex}
            notes = {notes}
            deleteNote={deleteNote}
            selectNote = {selectNote}
            newNote={newNote}
            >
        </SidebarComponent>
        {
        selectedNote ? 
        <Modal>
          <EditorComponent 
          key = {selectedNoteIndex}
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes = {notes}
          noteUpdate = {noteUpdate}>📔</EditorComponent> </Modal> :
        null
        }
       </div>
      ) 
       :
      (
        <center><h3> Sorry you need to Login to add notes</h3></center>
      )
       }









    </div>
  )
}

export default Signup





