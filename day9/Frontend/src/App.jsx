import { useState, useEffect } from 'react'
import axios from 'axios'

// backend or frontemd dono running hone chaiye live krne ke liye

function App() {

  const [notes, setNotes] = useState([])


  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  // CORS policy ek website pe rehte dusri website pe request nhi krne deti

  // CORS (Cross-Origin Resource Sharing) is a browser security policy that controls whether your frontend website (origin A) is allowed to make requests to a backend website/server (origin B).


  // console.log('hello integration');  // prints multiple times

  // jb bhi aap ek state variable ko change krte ho toh jis bhi component ke andar state variable hota hai woh component baar baar re-render hota hai

  // jaise hi hm ek nyi note daalte hai toh ek state variable change hota hai app re render hota hai or phir se api call chlti hai phir se data aata hai phir notes mein jaata hai phir state variable change hota hai phir se console pe cheeze print hoti hai nad the loop continues so on


  useEffect(() => {
    // axios.get('http://localhost:3000/api/notes') // jo method ki api call krni hai uska method likh do
    //   .then((res) => {
    //     // console.log(res.data.notes);
    //     setNotes(res.data.notes)
    //   })

    fetchNotes()
  }, [])

  // useEffect sirf pehli baar render hone pe chalega api call chalegi notes mein data aayega phir se app re render hoga magar iss bar api call nhi jayegi kyuki woh sirf pehle render pe jaati hai

  // console.log('hello integration');  // (2) hello integration


  function formSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    // console.log(title.value, description.value);

    axios.post('http://localhost:3000/api/notes', { // ye data req.body ke andar jayega
      title: title.value,
      description: description.value
    })
      .then(res => {
        console.log(res.data);

        fetchNotes()
      })


      title.value = ''
      description.value = ''

  }

  function handleDeleteNote(id) {
    console.log(id);

    axios.delete(`http://localhost:3000/api/notes/${id}`)
      .then(res => {
        console.log(res);
        fetchNotes()
      })
  }

  function editNote(e, note) {
    // axios.patch('http://localhost:3000/api/notes/'+id)

    console.log(e);

  }


  return (
    <>

      <form className='note-create-form' onSubmit={(e) => {
        formSubmit(e)
      }}>
        <input name='title' type="text" placeholder='Enter Tittle' />
        <input name='description' type="text" placeholder='Enter Description' autoComplete="off" />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return <div key={idx} className="note">
            <h1>{note.title}</h1>

            <div className="desc">
              <p>{note.description}</p>
              <input type="text" placeholder='Enter Description' />
            </div>

            <div className="btns">
              <button onClick={() => {
                handleDeleteNote(note._id)
              }}>delete</button>

              <button onClick={(e, note) => {
                editNote(e, note)
              }}>Edit</button>
            </div>

          </div>
        })}
      </div>
    </>
  )
}

export default App
