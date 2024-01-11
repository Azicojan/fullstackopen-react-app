const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tokzor1231983:${password}@mycluster.801xs2q.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
},
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


/*
const note = new Note(
   {
    content:"HTML is easy",
    important: true
    }
)



note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

/*{
  id:2,
  content:"Browser can execute only JavaScript",
  important: false
  },
  {
  id:3,
  content: "GET and POST are the most important methods of HTTP protocol",
  important:true
  }
*/