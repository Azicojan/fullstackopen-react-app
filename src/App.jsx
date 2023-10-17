import './App.css'
import {useState} from 'react'

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
}

export default App
