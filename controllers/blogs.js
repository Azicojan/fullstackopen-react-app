const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
    
     const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
     response.json(blogs)
    
})



blogsRouter.post('/', async (request, response) => {
  
   const body = request.body
   const userIdentified = request.user
  //console.log(userIdentified)
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: userIdentified.id
    })

    const savedBlog = await blog.save()
    userIdentified.blogs = userIdentified.blogs.concat(savedBlog._id)
    await userIdentified.save()

    response.status(201).json(savedBlog)
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