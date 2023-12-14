import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    const request = axios.post(baseUrl,personObject)
    return request.then(response => response.data)
}

const deleteContact = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

export default {getAll,create,deleteContact}

/*{
  "persons": [
    {
      "name": "Azicojan",
      "number": "99-802-18-99",
      "id": 13
    },
    {
      "name": "Zafar",
      "number": "99-111-22-33",
      "id": 14
    },
    {
      "name": "Timka",
      "number": "99-123-44-55",
      "id": 15
    },
    {
      "id": 3,
      "name": "Akramtoy",
      "number": "93-335-33-44"
    }
  ]
}*/