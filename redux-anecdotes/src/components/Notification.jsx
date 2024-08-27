import { useSelector } from "react-redux"



const Notification = () => {
  const notification = useSelector(state => state.notification.message)
 
  console.log(notification)
  
   
  
 

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      <div style={style}>
      {notification}
    </div>
   
    </div>
    
  )
}

export default Notification