const request = require('supertest')
const app = require('../App.js')

// POST
describe('Post a new dog', () => {
  xit('Should create a new dog entry', async () => {
    const res = await request(app.callback() )
      .post('/api/v1/dogs')
      .set('Authorization', 'Basic '+btoa("jack:1234")) //staff
      .send( 
        {
          name: "selen",
          age: 1,
          weight: 1,
          sex: 'Girl (F)',
          breed: 'Golden Retriever',
          location: 'locationA'
        }
      )
    expect(res.statusCode).toEqual(201)
  })
})
describe('Post a new dog without permission', () => {
  xit('Should not create a new dog entry', async () => {
    const res = await request(app.callback() )
      .post('/api/v1/dogs')
      .set('Authorization', 'Basic '+btoa("peter:1234")) //user
      .send(
        {
          name: 'selen',
          age: 1,
          weight: 1,
          sex: 'Girl (F)',
          breed: 'Golden Retriever',
          location: 'locationA'
        }
      )
    expect(res.statusCode).toEqual(403)
  })
})
describe('Post a new dog without account', () => {
  xit('Should not create a new dog entry', async () => {
    const res = await request(app.callback() )
      .post('/api/v1/dogs')
      .send(
        {
          name: 'selen',
          age: 1,
          weight: 1,
          sex: 'Girl (F)',
          breed: 'Golden Retriever',
          location: 'locationA'
        }
      )
    expect(res.statusCode).toEqual(401)
  })
})
// PUT
describe('Put a dog', () => {
  xit('Should update a dog entry', async () => {
    const res = await request(app.callback() )
      .put('/api/v1/dogs/1')
      .set('Authorization', 'Basic '+btoa("jack:1234")) //staff
      .send(
        {
          name: 'Korone',
          age: 1,
          weight: 1,
          sex: 'Girl (F)',
          breed: 'Golden Retriever',
          location: 'locationA'
        }
      )
    expect(res.statusCode).toEqual(200)
  })
})
describe('Put a dog without permission', () => {
  xit('Should not update a dog entry', async () => {
    const res = await request(app.callback() )
      .put('/api/v1/dogs/1')
      .set('Authorization', 'Basic '+btoa("peter:1234")) //user
      .send(
        {
          name: 'Korone',
          age: 1,
          weight: 1,
          sex: 'Girl (F)',
          breed: 'Golden Retriever',
          location: 'locationA'
        }
      )
    expect(res.statusCode).toEqual(403)
  })
})
describe('Put a dog without account', () => {
  xit('Should not update a dog entry', async () => {
    const res = await request(app.callback() )
      .put('/api/v1/dogs/1')
      .send(
        {
          name: 'Korone',
          age: 1,
          weight: 1,
          sex: 'Girl (F)',
          breed: 'Golden Retriever',
          location: 'locationA'
        }
      )
    expect(res.statusCode).toEqual(401)
  })
})

// GET
describe('Get all dogs', () => {
  xit('Should get all new dog entries', async () => {
    const res = await request(app.callback() )
      .get('/api/v1/dogs')
    expect(res.statusCode).toEqual(200)
  })
})
describe('Search dogs by numerial condition', () => {
  xit('Should get searched dog entries', async () => {
    const res = await request(app.callback() )
      .get('/api/v1/dogs/search')
      .query(
        {
          type: 'number',
          fields: 'name%age%weight%sex%breed%location',
          sfields: 'id',
          q: 1
        }
      )
    expect(res.statusCode).toEqual(200)
  })
})
describe('Search dogs by text condition', () => {
  xit('Should get searched dog entries', async () => {
    const res = await request(app.callback() )
      .get('/api/v1/dogs/search')
      .query(
        {
          type: 'text',
          fields: 'name%age%weight%sex%breed%location',
          sfields: 'breed',
          q: 'golden'
        }
      )
    expect(res.statusCode).toEqual(200)
  })
})