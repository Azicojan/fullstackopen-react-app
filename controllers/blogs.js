const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
    
     const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
     response.json(blogs)
    
})

blogsRouter.get('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)

    if(blog){
        response.json(blog)
    }
    else {
        response.status(404).end()
    }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer')) {
      return authorization.replace('Bearer ', '') // Fix: Remove 'Bearer ' prefix
    }
    return null
  }


blogsRouter.post('/', async (request, response) => {
  
   const body = request.body
   //const userIdentified = request.user
  //console.log(userIdentified)

  const token = getTokenFrom(request)

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    // Check if decoded token contains 'id' field
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' })
    }

    // Find user by id
    const user = await User.findById(decodedToken.id)
    //console.log(user)
    // Ensure user exists
    if (!user) {
      return response.status(401).json({ error: 'User not found' })
    }
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
} catch (error) {
    // Handle token verification errors
    console.error('Token verification error:', error)
    return response.status(401).json({ error: 'Token verification failed' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)
    const userIdentified = request.user
       
    
    if(blogToDelete.user.toString() === userIdentified.id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(201).end()
    }
    else return response.status(401).json( { error: 'invalid token'})
     
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    

    const blog = {
        likes:body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true} )
    response.json(updatedBlog)
})

module.exports = blogsRouter