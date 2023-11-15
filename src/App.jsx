
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import personService from './services/persons'



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

export default App


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

export default App*/


//ex.2.6-2.10 The Phonebook

/*const Filter = (props)=>{

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
    setPersons(persons.concat(personObject)
    //setPersons([...persons,personObject]  
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

//Exercise 2.11
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
const[persons, setPersons] = useState([])
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [foundPerson, setFoundPerson]=useState('')

useEffect(()=>{
  axios
  .get('http://localhost:3001/persons')
  .then(response=>
  setPersons(response.data)
  )
},[])

console.log(persons)

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
    setPersons(persons.concat(personObject)
    //setPersons([...persons,personObject]  
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


//Ex.2.12-2.15

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
            onChange={addNewName}
            required/>
          </div>

          <div>number: <input 
            //type='number'
            value={newNumber}
            onChange={addNewNumber}
            placeholder='123-45-67'
            required/>
          </div>

          <div>
            <button  type='submit' style={{marginTop:20}}>add</button>
          </div>

        </form>

  )
}

const Persons = (props)=>{
  const{allNames,persons,foundPerson,deletePerson}=props

  const availableContact = allNames.filter(person=>person.toUpperCase()
===foundPerson.toUpperCase()).join()
//console.log(availableContact)

const personToShow = allNames.includes(availableContact)
? persons.filter(person=>person.name.toUpperCase()===foundPerson.toUpperCase()): persons


  return(
        <ul style={{listStyleType:'none'}}>
          
          {personToShow.map((person)=><li key={person.id}>
            {person.name}: {person.number} 
             <button onClick={()=>
             {if(window.confirm(`Delete ${person.name}?`)){
              deletePerson(person.id)
            }
          }
        }
              >delete</button> 
            </li>)}
          
        </ul>
  )
}

const App =()=>{
const[persons, setPersons] = useState([])
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [foundPerson, setFoundPerson]=useState('')



  useEffect(()=>{
    personService
    .getAll()
    .then(initialList=>{
    setPersons(initialList)
  })
  },[])



//console.log(persons)

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

  const personObject = {
    name:newName,
    number:newNumber
  }
  
  if(allNames.map((name)=>name.toUpperCase()).includes(newName.toUpperCase())){
   // console.log(newName)

    let result = confirm(`${newName} is already added to the phonebook,
     replace the old number with a new one?`)
     
     if(result == true){        
     
          const contact = persons.find((person)=>person.name.toUpperCase() === newName.toUpperCase())
          //console.log(contact)

          const updateContact = {...contact, number:newNumber}
          axios.put(`http://localhost:3001/persons/${contact.id}`,updateContact).then(response =>{
            //console.log(response.data)
            
            personService
            .getAll()
            .then(initialList=>{
            setPersons(initialList)
  })
          })
    
     }
     else{
      setNewName('')
      setNewNumber('')
     }
  }
  else {
    //setPersons(persons.concat(personObject)
    //setPersons([...persons,personObject])
    
    personService
    .create(personObject)
    .then(returnedPerson=>{
     // console.log(returnedPerson)
      setPersons(persons.concat(returnedPerson))
    })
   
        
  }
  
  setNewName('')
  setNewNumber('') 
  
}


  
const findPerson =(event)=>{
  setFoundPerson(event.target.value)
  
}
//console.log(persons)
//console.log(foundPerson)

const deletePerson = (id) => {
  
  personService.deleteContact(id).then(response => {
  //console.log(`deleted person with ID ${id}`, response)
    personService
    .getAll()
    .then(initialList=>{
    setPersons(initialList)
  })
})
   
}


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
        //updateNumber={updateNumber}
         
         />
        

        <h2>Numbers</h2>
         <Persons 
         allNames={allNames}
         persons={persons}
         foundPerson={foundPerson}
         deletePerson={deletePerson}

          />
        
    </div>
  )
}

export default App

