const request = require('supertest')
const app = require('../App.js')

// POST
describe('Post a new user', () => {
  xit('Should create a new user', async () => {
    const res = await request(app.callback() )
      .post('/api/v1/users')
      .send( {
        username: 'selen',
        password: '1234'
      })
    expect(res.statusCode).toEqual(201)
  })
})
describe('Post a new user with signupcode', () => {
  xit('Should create a new user', async () => {
    const res = await request(app.callback() )
      .post('/api/v1/users')
      .send( {
        username: 'pomu',
        password: '1234',
        signupcode: 'secretsignupcode'
      })
    expect(res.statusCode).toEqual(201)
  })
})

// GET
describe('Get a user with id', () => {
  xit('Should get a user', async () => {
    const res = await request(app.callback() )
      .get('/api/v1/users/20')  // peter
      .set('Authorization', 'Basic '+btoa('jack:1234')) // staff
    expect(res.statusCode).toEqual(200)
  })
})
describe('Get a user with id', () => {
  xit('Should get a user', async () => {
    const res = await request(app.callback() )
      .get('/api/v1/users/20')  // peter
      .set('Authorization', 'Basic '+btoa('peter:1234')) // user:peter
    expect(res.statusCode).toEqual(200)
  })
})
describe('Get a user with id', () => {
  xit('Should not get a user', async () => {
    const res = await request(app.callback() )
      .get('/api/v1/users/20')  // peter
      .set('Authorization', 'Basic '+btoa('david:1234')) // user:david
    expect(res.statusCode).toEqual(403)
  })
})
describe('Get a user with id', () => {
  xit('Should not get a user', async () => {
    const res = await request(app.callback() )
      .get('/api/v1/users/20')  // peter
    expect(res.statusCode).toEqual(401)
  })
})