import './App.css'
import {useState} from 'react'

/*const History = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
  
const Display = props => <div>{props.value}</div>


const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)*/

function App() {

  /*
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)*/

  /*setTimeout(
    () => setCounter (counter + 1),
    1000
  )

  const handleClick = () => {
    console.log('clicked')
    setCounter (counter + 1)
  }
 */
/*
  const increaseByOne = () => {
    console.log(('increasing, value before', counter))
    setCounter(counter + 1)
  }

  const decreaseByOne = () =>{
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  } 

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  const Display = ({counter}) => <div>{counter}</div>
      
  const Button = ({handleClick,text}) => <button onClick = {handleClick}>{text}</button>
     
  return (
    <div>
      <Display counter={counter} />

      <Button 
       handleClick = {increaseByOne}
       text='plus'
      />
        
      
      <Button 
       handleClick = {setToZero}
       text='zero'
      />

      <Button 
       handleClick = {decreaseByOne}
       text='minus'
       />

    </div>
    
  )

  const [clicks, setClicks] = useState({left: 0, right: 0})
  
 const handleLeftClick = () => {
  const newClicks = {
    ...clicks,
    left: clicks.left + 1
  }
  setClicks(newClicks)
  console.log(newClicks)
 }

 const handleRightClick = () => {
  const newClicks = {
    ...clicks,
    right: clicks.right + 1
  }
  setClicks(newClicks)
  console.log(newClicks)
 }

 console.log(clicks)
 

  return(
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {clicks.right}
    </div>
  )*/
  
/*
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
   // console.log('left before',left)
   const updatedLeft = left + 1
    setLeft(updatedLeft)
    //console.log('left after', left)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <div>
      {left}
      <Button handleClick = {handleLeftClick} text='left'/>
      <Button handleClick = {handleRightClick} text='right'/>
      {right}
      <History allClicks = {allClicks} />
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
    </div>
  )*/

  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }
    
  
  

  return(
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />

    </div>
  )






  const course = {

    name:'Half Stack application development',
    parts:[
    {
      name: 'Fundamental of React',
      exercises: 10
    },
    
     {
      name: 'Using props to pass data',
      exercises: 7
    },
    
     {
      name: 'State of a component',
      exercises: 14
    }

  ]
}
  
const Hello = ({name, age}) => {
 //const{name, age} = props
 const bornYear = () => new Date().getFullYear() - age
 


  return (
    <div>
      <p>
        Hello {name}, you are {age} years old.
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}


const App2 = () =>{
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10}/>
      <Hello name={name} age={age} />
    </div>
  )
}


  const Header = (props) =>{
   // console.log(props);
    return(
      <h1>{props.course.name}</h1>
    )

  }

  const Content = (props) =>{
   // console.log(props)
     return(
      <div>
        <p>{props.course.parts[0].name} - {props.course.parts[0].exercises}</p>
        <p>{props.course.parts[1].name} - {props.course.parts[1].exercises}</p>
        <p>{props.course.parts[2].name} - {props.course.parts[2].exercises}</p>

      </div>
     )
  }

 

  const Total = (props) =>{
     return (
      <div>
        <p>
          Number of exercises : {props.course.parts[0].exercises
           + props.course.parts[1].exercises+props.course.parts[2].exercises}.
        </p>
      </div>
     )
  }

  return (
    <div>
     <Header course = {course}/>
     <Content course = {course}/>
     <Total course = {course}/>
     <App2 />
    </div>
  )
}

export default App
