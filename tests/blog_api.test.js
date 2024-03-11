
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const api = supertest(app)

const Blog = require('../models/blog')

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('there are six blogs in the test database', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
})
test('verify if an id property exists', async () => {
    const response = await api.get('/api/blogs')

    const blogIds = response.body.map((blog) => blog.id )
    expect(blogIds).toBeDefined()
   
    
})



const createTestUserAndToken = async () => {
    const testUsername = 'testuser333';
    const testPassword = 'testpassword333';

    //Hash the test password
    const passwordHash = await bcrypt.hash(testPassword, 10)

    //Create a test user
    const testUser = new User({
        username: testUsername,
        passwordHash
    })

    //Save the test user to the database
    await testUser.save();

    //Generate a token for the test user
    const userForToken = {
        username: testUser.username,
        id: testUser._id
    }

    const testToken = jwt.sign(userForToken, process.env.SECRET)

    return { testUser, testToken }

    
}
test('a new blog can be added', async () => {
    const { testToken } = await createTestUserAndToken();
    //console.log(testToken)
    
    const initialBlogs = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${testToken}`)

      
    const newBlog = {
        title: 'We might visit Turkey as well this summer',
        author: 'Me and my family',
        url: 'www.google.com',
        
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${testToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${testToken}`)
      
      

      expect(response.body).toHaveLength(initialBlogs.body.length + 1)

      const titles = response.body.map((r) => r.title)
      expect(titles).toContain('We might visit Turkey as well this summer')
      
})

test ('401 error', async () => {
    const response = await api.get('/api/blogs');

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized')
    

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