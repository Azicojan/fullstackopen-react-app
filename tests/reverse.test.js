
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe ('total likes', () => {

    const listWithOneBlog = [
        {
            _id: '65a6474cb211bcb482008960',
            title: "Chinese cars",
            author: "Charles Mackintosh",
            url: "www.google.com",
            likes: 1250,
            __v: 0
        }
    ]

    const blogs = []

    const listWithTwoBlogs = [
        {
            _id: '65a6474cb211bcb482008960',
            title: "Chinese cars",
            author: "Charles Mackintosh",
            url: "www.google.com",
            likes: 1250,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Germany",
            author: "Azicojan",
            url: "www.google.com",
            likes: 105000,
            __v: 0
        }
        
    ]

    test('of empty list is zero', () => {
        
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(1250)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        expect(result).toBe(106250)
    })

    
})

describe('the most likes', ()=> {
   
    const listWithThreeBlogs = [
        {
            _id: '65a6474cb211bcb482008960',
            title: "Chinese cars",
            author: "Charles Mackintosh",
            url: "www.google.com",
            likes: 1250,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Germany",
            author: "Azicojan",
            url: "www.google.com",
            likes: 105000,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Germany",
            author: "Azicojan",
            url: "www.google.com",
            likes: 209000,
            __v: 0
        }
    ]

    test ('the blog which has the most likes', ()=> {
        const result = listHelper.favoriteBlog(listWithThreeBlogs)
        expect(result).toEqual({title:"My trip to Germany", author: "Azicojan", likes:209000})
       // console.log(result)
    })


})

describe('the most blogs', () => {

    const listOfMultipleBlogs = [
        {
            _id: '65a6474cb211bcb482008960',
            title: "Chinese cars",
            author: "Charles Mackintosh",
            url: "www.google.com",
            likes: 1250,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Turkey",
            author: "Azicojan",
            url: "www.google.com",
            likes: 100000,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Germany",
            author: "Azicojan",
            url: "www.google.com",
            likes: 105000,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Georgia",
            author: "Azicojan",
            url: "www.google.com",
            likes: 85000,
            __v: 0
        }
    ]

    test('the author with most blogs', () => {
      const result = listHelper.mostBlogs(listOfMultipleBlogs)
     // console.log(result)
      expect(result).toEqual({author: "Azicojan", blogs: 3})
    })
})

describe('the author with most likes', () => {

    const listOfMultipleBlogs = [
        {
            _id: '65a6474cb211bcb482008960',
            title: "Chinese cars",
            author: "Charles Mackintosh",
            url: "www.google.com",
            likes: 125000,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Turkey",
            author: "Azicojan",
            url: "www.google.com",
            likes: 100000,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Germany",
            author: "Azicojan",
            url: "www.google.com",
            likes: 105000,
            __v: 0
        },
        {
            _id: '65a6474cb211bcb482009874',
            title: "My trip to Georgia",
            author: "Azicojan",
            url: "www.google.com",
            likes: 185000,
            __v: 0
        }
    ]

    test('the author with most blogs', () => {
      const result = listHelper.mostLikes(listOfMultipleBlogs)
      //console.log(result)
      expect(result).toEqual({author: "Azicojan", likes: 390000})
    })
})



