
const Course = (props) => {

    const {courses} = props
    
    
        
    return (
    <ul style={{listStyleType:'none',padding:0}}>
      
    { courses.map((item) =>
       
       <li key={item.id}>
  
         {<Header courseName={item.name} />}
         {<Content course={item.parts} />}
         {<Total parts={item.parts}/>}
  
       </li>)}
        
      
    </ul>
    )
    
  }
  
  const Header = (props) => {
    
    const {courseName} = props
    
   // console.log(courseName)
    
    return (
      <div style={{textAlign:'left'}}>
       <p> <strong>{courseName}</strong></p>
      </div>
      
    )
  }
   
  const Content = (props) => {
  
    const {course} = props
  
    return (
       <ul style={{listStyleType:'none',padding:0,textAlign:'left'}}>
         {course.map((item)=><li key={item.id}><p>{item.name}: {item.exercises}</p></li>)}
        
       </ul>
      
    )
  }
  
  
  
  const Total= (props) =>{
    
  
    const {parts} = props
   // console.log(parts)
  
    const sum = parts.reduce((x,y) => x + y.exercises,0)
  
    return(
      <div style={{textAlign:'left',marginBottom:30}}>
        <strong >total of {sum} exercises</strong>
      </div>
    )
  
  }

  export default Course