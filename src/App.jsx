import './App.css'
import {useState} from 'react'
/*
const Button = (props) =>{

  const {handleClick, text} = props

  return(
    <div style={{display:'inline-block'}}>
      
      <button onClick={handleClick}>{text}</button>
      
    </div>
    

  )
}

const Statistics = ({good, neutral, bad}) => {

  //const {good, neutral, bad} = props

  const all = good+neutral+bad
  let average;
  let positive;

  if(all===0){
    average = 0;
    positive = 0;
  }
   else {
    average = (good-bad)/all
    positive = (good/all)*100
   }

   return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positive}%`} />
            
    </div>

   )

}

const StatisticLine = (props) => {

  return(
   
      <table>
        <tbody>
        <tr>
          <td style={{width:70,textAlign:'left'}}>{props.text}:</td>
          <td>{props.value}</td>
        </tr>
        </tbody>
      </table>
              
  )
 
}

function App()  {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
   
   return (
    <div>
      <h2>give feedback</h2>
     
       <Button handleClick={()=>setGood(good + 1)} text={'good'}/>
       <Button handleClick={()=>setNeutral(neutral + 1)} text={'neutral'}/>
       <Button handleClick={()=> setBad(bad + 1)} text={'bad'}/>
       
      <h2>statistics</h2>
      {good||neutral||bad ? <Statistics good={good} neutral={neutral} bad={bad}/>
       :'No feedback given'
      }      
      
    </div>
  )
}*/

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    `The first 90 percent of the code accounts for the first 10 percent of the development time...
    The remaining 10 percent of the code accounts for the other 90 percent of the development time.`,
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([])

  


  const randomAnecdote = () =>{

    const nextAnecdote = Math.floor(Math.random()*anecdotes.length)
    setSelected(nextAnecdote)
    
  }

  const voteForAnecdote = () =>{
  
    let selectedAnecdote= [...points,Array.apply(null, new Array(8)).map(Number.prototype.valueOf,0)]
   
    setPoints(
      selectedAnecdote
    )
    
    selectedAnecdote[0][selected] +=1   
  }

  console.log(selected)
  console.log(points[0])
  
  let mostVotes = points[0].indexOf(Math.max(...points[0]))
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}<br/>
      has {points.length===0?0:points[0][selected]} votes<br/>
      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={()=>randomAnecdote()}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVotes]}<br/>
      has {Math.max(...points[0])} votes
    </div>
  )
}

export default App
