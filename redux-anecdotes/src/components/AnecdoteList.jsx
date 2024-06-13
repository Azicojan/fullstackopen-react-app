import { useDispatch, useSelector } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer"; 


const AnecdoteList = () => {
    const dispatch = useDispatch()
   
    
    const anecdotes = useSelector(state => {
      
      const filteredAnecdotes = state.filter !== 'ALL' && state.filter !== ''
        ? state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        : state.anecdotes;
        console.log(filteredAnecdotes)
      //  console.log(state.filter)
      //  console.log(state.anecdotes)
      return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);
    
    })

   //console.log(useSelector(state=>state.filter))
  // console.log(useSelector(state => state))
  console.log(anecdotes)
    

    const vote = (id) => {
        console.log('vote', id)
        dispatch(updateAnecdote(id))
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id )
        const message = votedAnecdote.content
        dispatch(setNotification(`you voted '${message}'`, 5))

        
      }
    

    return(
        <div>
            {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
        
    )
}

export default AnecdoteList