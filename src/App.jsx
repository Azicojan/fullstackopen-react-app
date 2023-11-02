
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'



//exercise 2.1-2.5
/*
import Course from './components/Course'

const App = () => {

  const courses = [
    {
    id:1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamental of React',
        exercises:10,
        id:1
      },
      {
        name:'Using props to pass data',
        exercises:7,
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id:4
      }
    ]
  },
  {
    name: 'Node.js',
    id:2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
  

]

  return (
    <div>
      <h2>Web development curriculum</h2>
      <Course courses={courses} />
    </div>
    
  ) 
  
  
}

export default App*/


const App = () =>{

  const [notes, setNotes] = useState([])
  const [newNote,setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
 // console.log(typeof notes)
 console.log(notes)

  useEffect(()=>{
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  },[])
console.log('render', notes.length, 'notes')




  const addNote = (event) =>{

    event.preventDefault()
    const noteObject = {
      name: newNote,
      important: Math.random() <0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
    
  }

  const handleNoteChange =(event) => {
   // console.log(event.target.value)
    setNewNote(event.target.value)
   // console.log(event)
   
  }
  //console.log(notes)
const notesToShow = showAll? notes: notes.filter(note=>note.important)

return(
  <div>
    <h1>Notes</h1>
    <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll?'important':'all'}
      </button>
    </div>



    <ul style={{listStyleType:'none'}}>
      {notesToShow.map(note =>
        <Note key={note.id} note={note}/>)}
    </ul>
    <form onSubmit={addNote}>
      <input
       value={newNote}
       onChange={handleNoteChange}
       />
      <button type='submit'>save</button>
    </form>
  </div>
)
}

export default App


//ex.2.6-2.10 The Phonebook
/*
const Filter = (props)=>{

  const{foundPerson,findPerson}=props

  return(
        <div>
          filter shown with <input
          value={foundPerson}
          onChange={findPerson} />
        </div>
  )
}

const PersonForm = (props)=>{
  const{addNewPerson,newName,addNewName,newNumber,addNewNumber}=props

  return(

       <form onSubmit={addNewPerson}>

          <div>
            name: <input
            value={newName}
            onChange={addNewName} />
          </div>

          <div>number: <input 
            value={newNumber}
            onChange={addNewNumber}/>
          </div>

          <div>
            <button type='submit' style={{marginTop:20}}>add</button>
          </div>

        </form>

  )
}

const Persons = (props)=>{
  const{allNames,persons,foundPerson}=props

  const availableContact = allNames.filter(person=>person.toUpperCase()
===foundPerson.toUpperCase()).join()
//console.log(availableContact)

const personToShow = allNames.includes(availableContact)
? persons.filter(person=>person.name.toUpperCase()===foundPerson.toUpperCase()): persons


  return(
        <ul style={{listStyleType:'none'}}>
          
          {personToShow.map((person)=><li key={person.name}>{person.name}: {person.number}</li>)}
          
        </ul>
  )
}

const App =()=>{
const[persons, setPersons] = useState([{name:'Arto Hellas',number:'99-802-18-99'}])
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [foundPerson, setFoundPerson]=useState('')

const addNewName=(event)=>{
    setNewName(event.target.value)  
}

const addNewNumber = (event)=>{
  setNewNumber(event.target.value)
}
//console.log(newName)
const allNames = persons.map((person) => person.name)
//console.log(allNames)


const addNewPerson=(event)=>{
  event.preventDefault()
  
  if(allNames.includes(newName)){
    alert(`${newName} is already added to the phonebook`)
  }
  else {
    setPersons(persons.concat({name:newName,number:newNumber})
    //setPersons([...persons,{name:newName,number:newNumber}]  
    )
  }
  
  setNewName('')
  setNewNumber('')
}

//console.log(persons)


  
const findPerson =(event)=>{
  setFoundPerson(event.target.value)
  
}

//console.log(foundPerson)



  return (
    <div>
        <h2>Phonebook</h2>
        
        <Filter foundPerson={foundPerson} findPerson={findPerson}/>

        <h2>add a new</h2>

         <PersonForm 
         addNewPerson={addNewPerson}
         newName={newName}
         addNewName={addNewName}
         newNumber={newNumber}
         addNewNumber={addNewNumber}
         />
        

        <h2>Numbers</h2>
         <Persons 
         allNames={allNames}
         persons={persons}
         foundPerson={foundPerson} />
        
    </div>
  )
}

export default App
*/