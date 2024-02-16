
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('there are two notes in the test database', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
})
test('verify if an id property exists', async () => {
    const response = await api.get('/api/blogs')

    const blogIds = response.body.map((blog) => blog.id )
    expect(blogIds).toBeDefined()
   // console.log(blogIds)
    
})

test('a new note can be added', async () => {

    const initialBlogs = await api.get('/api/blogs')
    console.log(initialBlogs.body)


    const newNote = {
        title: 'I am planning to visit Nukus next month',
        author: 'Me and my family',
        url: 'www.google.com'
    }

    await api
      .post('/api/blogs')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      //console.log(response.body)
      
      const titles = response.body.map((r) => r.title)

      expect(response.body).toHaveLength(initialBlogs.body.length + 1)
      expect(titles).toContain('I am planning to visit Nukus next month')
      
})

test('verify that the likes property is missing', async () => {
    const response = await api.get('/api/blogs')
    const likes = response.body.map((r) => r.likes)
     
    const missingLikes = () => {
        if(likes.includes(undefined)) {
            return 0
        }
        
    }
        
    expect(missingLikes()).toBe(0)

})

test('verify that if the title or url properties are missing', async () => {

    const newNote = {
        author:'Azicojan'
    }

    await api
     .post('/api/blogs')
     .send(newNote)
     .expect(400)

     const response = await api.get('/api/blogs')
     console.log(response.body)
})

test('deleting a single blog post', async () => {

    const blogsInDb = async () => {
        const blogs = await Blog.find({})
        return blogs.map(blog => blog.toJSON())
    }

    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    console.log('the list of current blogs',blogsAtStart)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

      const blogsAtEnd = await blogsInDb()

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

      const blogsIds = blogsAtEnd.map((r) => r.id)

      expect(blogsIds).not.toContain(blogToDelete.id)


})

test('verifying the likes property', async () => {

    const blogsInDb = async () => {
        const blogs = await Blog.find({})
        return blogs.map(blog => blog.toJSON())
    }

    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[1]

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .expect(200)

    const blog = {
        likes: 35000
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogToUpdate.id, blog, {new: true} )
    console.log(updatedBlog)
    
    

    expect(updatedBlog.likes).toEqual(35000)
}, 20000)

afterAll(async () => {
    await mongoose.connection.close()
})