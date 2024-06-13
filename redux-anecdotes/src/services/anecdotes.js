import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async(content) => {
    const object = { content , votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVotes = async(id) => {
    
    const anecdoteResponse = await axios.get(`${baseUrl}/${id}`)
    const anecdote = anecdoteResponse.data;
    console.log(anecdote)

    const updatedAnecdote = {
        content: anecdote.content,
        votes: anecdote.votes + 1
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

//updateVotes('cb4c')
  

export default { 
    getAll,
    createNew,
    updateVotes
 }