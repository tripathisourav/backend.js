import { useState } from 'react'
import axios from 'axios'

// backend or frontemd dono running hone chaiye live krne ke liye

function App() {

  const[notes, setNotes] = useState([])


  // CORS policy ek website pe rehte dusri website pe request nhi krne deti
  axios.get('http://localhost:3000/api/notes') // jo method ki api call krni hai uska method likh do
  .then((res) => {
    // console.log(res.data.notes);
    setNotes(res.data.notes)
  })
  return (
    <>
      <div className="notes">
        {notes.map((note, idx) => {
          return <div key={idx} className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
        </div>
        })}
      </div>
    </>
  )
}

export default App
