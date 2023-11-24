
import './App.css'
import {useState,useEffect} from 'react'
import axios from 'axios'




const NewListCountry= (props)=>{

  const{returnedList, country}=props

  const [theCountry, setTheCountry] = useState('')
 

  //console.log(country)

  useEffect(() =>{

    let newList = returnedList.filter((returnedCountry)=>returnedCountry.includes(country))

    if(newList.length===1){

      setTheCountry(newList[0])
    }
    else {
      setTheCountry('')
    }
    
  },[country, returnedList])

 //console.log(country.length)
    
  let newList = returnedList.filter((returnedCountry)=>returnedCountry.includes(country))

  const handleShow= (country)=>{
     setTheCountry(country)
         
  }

  if(theCountry){
    return(
      <div>
       <TheCountry theCountry={theCountry}/>
      </div>
    )
  }
  
 // console.log(theCountry)
  //console.log(newList)
  //console.log(newList.length)

    if(newList.length>10&&country.length>0){
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
    else if(newList.length>1&&country.length>0){
      return(
        <ul style={{listStyleType:'none'}}>
          {newList.map((country,index)=><li key={index}>{country} <button onClick={()=>handleShow(country)}>show</button></li>)}
        </ul>
      ) 
    }

    else if(newList.length === 1){
            
      return(
        <div>
          <TheCountry theCountry={theCountry}/>
        </div>
      )
    
  } else{
    return null
    
  }
           
   }
        
// }


 const TheCountry = ({theCountry})=>{

  const [returnedCountry, setReturnedCountry] = useState('')

   useEffect(()=>{
    if(theCountry){
     axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${theCountry}`).then(response=>{
         //console.log(response)
         setReturnedCountry(response.data)
        
 
           
     }).catch(error=>{
           console.log(error)
         })
      }
   },[theCountry])
  
     
          if(returnedCountry){

          let languages = Object.values(returnedCountry.languages)
        

          return(
            <>            
            <ul style={{listStyleType:'none'}}>
              <li><h2>{returnedCountry.name.common}</h2></li>
                <li>capital: {returnedCountry.capital}</li>
                <li>area: {returnedCountry.area}</li>
            </ul>
            <h4>languages</h4>
            <ul>
              {languages.map((language,index)=><li key={index}>{language}</li>)}
            </ul>
            <img src={returnedCountry.flags.png} alt="a country's flag"/>
            
            </>
        )   
  
          }
                      
 }


function App() {
  const [country, setCountry]= useState('')
  const [returnedList, setReturnedList] = useState([])
  

  useEffect(()=>{
    
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response=>{
     // console.log(response.data.map((country)=>country.name.common))
      setReturnedList(response.data.map((country)=>country.name.common))
    }).catch(error=>
      console.log(error))

},[])

//console.log(returnedList)

  const findCountry = (e)=>{
   e.preventDefault()
   
   setCountry(e.target.value?e.target.value[0].toUpperCase()+e.target.value.slice(1):'')
   
   
  }

  //console.log(country)

  return (
    <>
    
    <form>

      <div>      
        find countries <input
         type='text'
         value={country}
         onChange={findCountry}
         required />      
      </div>
    </form>
    <div>
      
       <NewListCountry
        returnedList={returnedList}
        country={country} 
         />
      
      
    </div>
    </>
  )
}

export default App
