import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'



const anecdotesAtStart = [
/*  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
*/]

const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)
//const initialState = anecdotesAtStart.map(anecdote => ({content: anecdote, id:getId(), votes: 0}))


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action){
      const updatedAnecdote = action.payload;
      console.log(updatedAnecdote)
      const index = state.findIndex(anecdote => anecdote.id === updatedAnecdote.id)
      if (index !== -1) {
        state[index] = updatedAnecdote;
      }
     },
     
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }

  },
    
})

/*
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  //console.log(asObject())

  switch(action.type) {
    case 'VOTE_ANECDOTE':
      return state.map(anecdote => 
        anecdote.id === action.payload
          ? {...anecdote, votes: anecdote.votes + 1}
          : anecdote
          );
    case 'NEW_ANECDOTE':
      return state.concat(action.payload)      
    default:
       return state
  }
  
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    payload: id
  }
}



export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id:generatedId(),
      votes:0
    }
  }
}

export default reducer*/

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))

  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}



export default anecdoteSlice.reducer