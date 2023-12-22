
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


const customFormat = (tokens, req, res)=>{

            let format = [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),'-',
            tokens['response-time'](req, res), 'ms'].join(' ');
    

            if(req.method === 'POST'){
                format += ` - {"name":${req.body.name},"number":${req.body.number}}`;
            }

            return format;
}

app.use(morgan(customFormat));



let persons = [
    {
        "id":1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id":2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id":3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id":4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
]

//const maxInfo = persons.length > 0 ? Math.max(...persons.map(n=>n.id)):0


app.get('/api/persons',(request, response)=>{
    //console.log('Sending data:', persons)
    response.json(persons)
    
})

app.get('/favicon.ico', (req, res) =>{
    res.sendStatus(204)
})


app.get('/info',(request,response)=>{
    response.send(`<p>Pnonebook has info for ${persons.length} people.</p>
<p>${new Date()}</p>`)
})


app.get(`/api/persons/:id`,(request,response)=>{
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).send('The phone contact is not available.')
    }

})

app.delete(`/api/persons/:id`,(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

})

const generateId = () => {
    const nextId = persons.length>0
    ?Math.round(Math.random()*1000)
    :0
    const idArr = persons.map((person)=>person.id)
    console.log(idArr)

    if(idArr.includes(nextId)){
        return nextId+1
    }
    else {
        return nextId
    }
}

app.post('/api/persons', (request, response) => {
 const body = request.body

 
 //console.log(person)
 let alreadyExists = persons.map((person)=>person.name)
 //console.log(alreadyExists)

 if(!body.name){
    return response.status(400).json({
        error:"The name of the contact is missing"
    })
 }
 else if(!body.number){
    return response.status(400).json({
        error:'The number of the contact is missing'
    })
 }
 else if(alreadyExists.includes(body.name)) {
   
    return response.status(400).json({
        error:'Such a name already exists'
    })
 }

 const person = {
    id:generateId(),
    name:body.name,
    number:body.number,
 }

 persons = persons.concat(person)
 response.json(person)
})

app.put(`/api/persons/:id`,(request,response)=>{
    const id = Number(request.params.id)

    /*
   const contactIndex = persons.findIndex(person => person.id === id)
   
    if(!contactIndex === -1){
        return response.status(404).json({error: 'Contact not found'})
    }
    
    persons[contactIndex].name = request.body.name || persons[contactIndex].name;
    persons[contactIndex].number = request.body.number || persons[contactIndex].number;
    response.json(persons[contactIndex])*/

    persons = persons.map(person => (person.id === id)
    ? {...person, name: request.body.name || person.name, number: request.body.number || person.number}:person)

    response.json(persons.find(person=>person.id === id))
    
    
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})