const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/dogsModel')
const auth = require('../controllers/auth')
const can = require('../permissions/dogsPermission')

const prefix = '/api/v1/dogs'
const router = new Router({ prefix: prefix });

// /
router.get('/', getAllDogs);
router.post('/', auth, bodyParser(), createDogEntry)
// /id
router.get('/:id([0-9]{1,})', getDogEntry)
router.put('/:id([0-9]{1,})', auth, bodyParser(), updateDogEntry)
router.del('/:id([0-9]{1,})', auth, deleteDogEntry)


async function createDogEntry(ctx) {
  const permission = can.create(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
  }
  else {
    const newDogEntry = ctx.request.body;
    console.log(newDogEntry)
    let result = await model.createDogEntry(newDogEntry)
    if (result) {
      ctx.status = 201
      ctx.body = result
    }
  }
}

async function getAllDogs(ctx) {
  let result = await model.getAllDogs()
  if (result) {
    ctx.status = 200
    ctx.body = result
  }
  else {
    ctx.status = 404
  }
}

async function getDogEntry(ctx) {
  let id = ctx.params.id
  let result = await model.getDogById(id)
  if (result) {
    ctx.status = 200
    ctx.body = result
  }
  else {
    ctx.status = 404
  }
}
async function updateDogEntry(ctx) {
  const permission = can.update(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
  }
  else {
    const newDogEntry = ctx.request.body
    let id = ctx.params.id
    let result = await model.updateDogById(newDogEntry, id)
    if (result) {
      ctx.status = 200
      ctx.body = `Dog with id ${id} updated`
    }
  }
}

async function deleteDogEntry(ctx) {
  const permission = can.delete(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
  }
  else {
    let id = ctx.params.id
    let result = await model.deleteDogById(id)
    if (result) {
      ctx.status = 200
      ctx.body = `Dog with id ${id} deleted`
    }
  }
}

module.exports = router;