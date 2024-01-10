
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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


/*
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
]*/

//const maxInfo = persons.length > 0 ? Math.max(...persons.map(n=>n.id)):0


app.get('/api/persons',(request, response)=>{
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})

app.get('/favicon.ico', (req, res) =>{
    res.sendStatus(204)
})


app.get('/info',(request,response, next)=>{
    Person.countDocuments({}).then(count => {
        response.send(`<p>There are ${count} contacts in the phonebook</p>
        <p>${new Date()}</p>`)
    })
    .catch(error => next(error))
    
})


app.get(`/api/persons/:id`,(request, response, next)=>{

    Person.findById(request.params.id).then(person => {
        if(person){
            response.json(person)
        } else {
            response.status(404).end()
        }
        
    })
    .catch(error => next(error))
    

})

app.delete(`/api/persons/:id`,(request,response,next)=>{

    const id = request.params.id

    Person.findOneAndDelete({_id:id}).then(person => {
        //console.log(person)
        response.status(204).end()
    })
    .catch(error => next(error))
    
   // persons = persons.filter(person => person.id !== id)

   

})
/*
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
}*/

app.post('/api/persons', (request, response) => {
 const body = request.body


  Person.findOne({ name: body.name })
        .then(existingPerson => {
            if (body.name === undefined) {
                return response.status(400).json({
                    error: "contact missing"
                });
            }

            if (body.number === undefined) {
                return response.status(400).json({
                    error: 'The number of the contact is missing'
                });
            }

            if (existingPerson) {
                return response.status(400).json({
                    error: 'Such a name already exists'
                });
            }

            const person = new Person({
                name: body.name,
                number: body.number
            });

            return person.save();
        })
        .then(savedPerson => {
            return response.json(savedPerson);
        })
        .catch(error => {
            // Handle any unexpected errors here
            console.error(error);
            return response.status(500).json({
                error: 'Internal Server Error'
            });
        });

})

app.put(`/api/persons/:id`,(request,response, next)=>{
    const id = request.params.id
    
    Person.findByIdAndUpdate(id, {$set: {name:request.body.name, number:request.body.number}}).then(person =>{
        console.log(person)
        response.json('contact has been updated')
    })
    .catch(error => next(error))
        
    
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({  error: 'something went wrong'})
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})