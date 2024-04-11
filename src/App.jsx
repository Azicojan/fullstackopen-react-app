import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) =>{

    event.preventDefault()

    const blogObject = {
      
      title: title,
      author: author,
      url: url
      
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      //console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 7000)
      setTitle('')
      setAuthor('')
      setUrl('')
    })
       
    
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try{
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      
      blogService.setToken(user.token)
      //console.log(user.token)
      setUser(user)
     // console.log(user)
      setUsername('')
      setPassword('')
    } 
    catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

   
    const loginForm = () => (
        <form onSubmit={handleLogin}>
      <div>
        username:
         <input
         type="text"
         value={username}
         name="Username"
         onChange={({target}) => setUsername(target.value)}
         />
      </div>
      <div>
        password:
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
          />
      </div>
      <button type='submit'>login</button>
    </form>
      
    )

    const handleLogOut = (event) => {
      event.preventDefault()
      window.localStorage.removeItem('loggedBlogappUser')
      setUsername('')
      setPassword('')
      window.location.reload()
    }

        
  

  return (
    <div>
      
      <h2>blogs</h2> 

        
      { user !== null?
        <Notification message={successMessage} user={user}/>:
        <Notification message={errorMessage}/>
      }

      {user === null ?
      loginForm():
      
      <div>
        <p>{user.name} logged-in <button type='submit' onClick={handleLogOut}>logout</button></p>
      
        <h2>create new</h2>

        <form onSubmit={addBlog}>
      <div>
        title:
         <input
         type="text"
         value={title}
         name="Title"
         onChange={({target}) => setTitle(target.value)}
         />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({target}) => setAuthor(target.value)}
          />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({target}) => setUrl(target.value)}
          />
      </div>
      <button type='submit'>create</button>
    </form><br/>

       {blogs.map(blog =>
         <Blog key={blog.id} blog={blog} />
       )}

      </div>
       }

    </div>
  )
}

export default App