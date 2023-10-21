
//exercise 2.1

import './App.css'

const Course = (props) => {

  const {course} = props
  
  return (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
  )
  
}

const Header = (props) => {
  //console.log(props)
  const {course} = props
  
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}
  
const Content = (props) => {

  const {course} = props

  return (
    <div>
      <Part  course={course}/>
    </div>
  )
}

const Part = (props) => {

  const {course} = props
  

  return (
     <ul style={{listStyleType:'none',textAlign:'left'}} >
      {course.parts.map((part)=><li key={part.id}><p>{part.name}: {part.exercises}</p></li>)}
    </ul>
  )
}




const App = () => {

  const course = {
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
      /*{
        name: 'High-Order functions',
        exercises: 9,
        id:4
      }*/
    ]
  }

  return <Course course={course} />
  
  
}

export default App
