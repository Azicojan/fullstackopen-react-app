var _ = require('lodash')

const dummy = (blogs) => {
return 1
}

const totalLikes = (blogs) => {

    if(blogs.length===1){
        return blogs[0].likes
    }
    else if(blogs.length>1){
       const initialValue = 0
       const arrOfLikes = blogs.map((blog) => blog.likes)
       const sumWithInitial = arrOfLikes.reduce(
        (accumulator, currentValue) => accumulator + currentValue, initialValue
       )
      return sumWithInitial;
    }
    else return 0
    
}

const favoriteBlog = (blogs) => {

  const favoriteAuthor = {
    title:'',
    author:'',
    likes:0
  }

   return blogs.reduce((a,b) => a.likes > b.likes 
   ? {...favoriteAuthor,...{title:a.title,author:a.author,likes:a.likes}} 
   : {...favoriteAuthor,...{title:b.title,author:b.author,likes:b.likes}}
   
   )
}

const mostBlogs = (blogs) => {

  const arrOfAuthors = blogs.map((blog) => blog.author)
  //console.log(arrOfAuthors)

  
  const count = {}
  arrOfAuthors.forEach(element => {
    count[element] = (count[element] || 0) + 1

  })

  const maxKey = _.maxBy(_.keys(count), (o) => count[o] )
  const maxValue =_.maxBy(_.values(count), (o) => o)
  
  const mostBlogs = {author:'',blogs:0}
  return {...mostBlogs,...{author:maxKey, blogs:maxValue}}
    
}

const mostLikes = (blogs) => {
   
  const arr2 = []
  
  blogs.forEach((elem) => arr2.push({author: elem.author, likes: elem.likes}))
 
  // Create an object to store the total likes for each author
  const likesByAuthor = {}

  arr2.forEach((entry) => {
    const {author, likes } = entry;
    // Sum up the likes for each author
    likesByAuthor[author] = (likesByAuthor[author] || 0) + likes;
  })
  // Find the author with the most likes 
  const mostLikedAuthor = Object.keys(likesByAuthor).reduce((a,b) => likesByAuthor[a] > likesByAuthor[b] ? a : b);
  
  const resultObject = { author: mostLikedAuthor, likes: likesByAuthor[mostLikedAuthor]}

  return resultObject
    

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}










/*const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const average = (array) => {
    const reducer = (sum, item) => {
      return sum + item
    }
  
    return array.length === 0
      ? 0
      : array.reduce(reducer, 0) / array.length
  }
  
  module.exports = {
    reverse,
    average
  }*/