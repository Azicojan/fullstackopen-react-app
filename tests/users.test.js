
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => { 
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'Azicojan', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

          const usersAtEnd = await helper.usersInDb()
          

          expect(usersAtEnd.length).toStrictEqual(usersAtStart.length + 1)

          const usernames = usersAtEnd.map(u => u.username)
          expect(usernames.includes(newUser.username))
          expect(newUser.username.length).toBeGreaterThanOrEqual(3)
          expect(newUser.password.length).toBeGreaterThanOrEqual(3)
          


    })

    test('creation of an invalid user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Azicojan',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

          const usersAtEnd = await helper.usersInDb()
          expect(result.body.error.includes('expected `username` to be unique'))
          
          expect(usersAtEnd.length).toStrictEqual(usersAtStart.length)
          
    })

    test('verify whether both username and password contain less than 3 characters', async () => {
        
        const newUser = {
            username: 'Az',
            name: 'Superuser',
            password: 'sa'
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
          

          expect(result.body.error)
          expect(newUser.username.length).toBeLessThan(3)
          expect(newUser.password.length).toBeLessThan(3)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})