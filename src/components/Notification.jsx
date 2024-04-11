import '../styling.css'

const Notification = ({ message, user }) => {
    if (message === null) {
        return null
    }

    return (
       <div>
         { user ?
            <div className='success'>
               {message}
            </div>
           :<div className="error">
               {message}
           </div>
         }
       </div>
       
    )
}

export default Notification