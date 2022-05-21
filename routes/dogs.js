const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/dogsModel')

const prefix = '/api/v1/dogs'
const router = new Router({ prefix: prefix });

// /
router.get('/', getAllDogs);
router.post('/', bodyParser(), createDogEntry)
// /id
router.get('/:id([0-9]{1,})', getDogEntry)
router.put('/:id([0-9]{1,})', bodyParser(), updateDogEntry)
router.del('/:id([0-9]{1,})', deleteDogEntry)


async function createDogEntry(cnx) {
  const newDogEntry = cnx.request.body;
  console.log(newDogEntry)
  let result = await model.createDogEntry(newDogEntry)
  if (result) {
    cnx.status = 201
    cnx.body = result
  }
}

async function getAllDogs(cnx) {
  let result = await model.getAllDogs()
  if (result) {
    cnx.status = 201
    cnx.body = result
  }
  else {
    cnx.status = 404
  }
}

async function getDogEntry(cnx) {
  let id = cnx.params.id
  let result = await model.getDogById(id)
  if (result) {
    cnx.status = 201
    cnx.body = result
  }
  else {
    cnx.status = 404
  }
}
async function updateDogEntry(cnx) {
  const newDogEntry = cnx.request.body
  let id = cnx.params.id
  let result = await model.updateDogById(newDogEntry, id)
  if (result) {
    cnx.status = 200
    cnx.body = `Dog with id ${id} updated`
  }
}

async function deleteDogEntry(cnx) {
  let id = cnx.params.id
  let result = await model.deleteDogById(id)
  if (result) {
    cnx.status = 200
    cnx.body = `Dog with id ${id} deleted`
  }
}

module.exports = router;