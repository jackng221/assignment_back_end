const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/dogsModel')
const auth = require('../controllers/auth')
const can = require('../permissions/dogsPermission')
const { validateDogEntry, validateDogUpdate } = require('../controllers/validation')

const prefix = '/api/v1/dogs'
const router = Router({ prefix: prefix });

// /
router.get('/', getAllDogs);
router.post('/', auth, bodyParser(), validateDogEntry, createDogEntry)
// /id
router.get('/:id([0-9]{1,})', getDogEntry)
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateDogUpdate, updateDogEntry)
router.del('/:id([0-9]{1,})', auth, deleteDogEntry)
// /search
router.get('/search', searchDogs)

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
async function searchDogs(ctx, next) {
  let { limit = 20, page = 1, type = "", fields = "", sfields = "", q = "" } = ctx.request.query;
  console.log(`${type} ${fields} ${sfields} ${q}`)
  // ensure params are integers
  limit = parseInt(limit);
  page = parseInt(page);

  // validate values to ensure they are sensible
  limit = limit > 100 ? 100 : limit;
  limit = limit < 1 ? 10 : limit;
  page = page < 1 ? 1 : page;
  let result = "";
  fields = fields.replace(/%/g, ", ");
  sfields = sfields.replace(/%/g, ", ");
  q = q.replace(/%/g, ", ");
  
  if (q != "")
    result = await model.searchDogs(type, fields, sfields, q)
  else
    result = await model.getAllDogs(limit, page);

  if (result.length) {
    ctx.body = result
    ctx.status = 200
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
      ctx.body = { message: `Dog with id ${id} updated` }
    }
    else {
      ctx.status = 404
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
      ctx.body = { message: `Dog with id ${id} deleted` }
    }
    else {
      ctx.status = 404
    }
  }
}

module.exports = router;