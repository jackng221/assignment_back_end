const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/usersModel')
const auth = require('../controllers/auth')

const prefix = '/api/v1/users'
const router = Router({ prefix: prefix });

// /
//router.get('/', auth, getAll)
router.get('/', getAllUsers)
router.post('/', bodyParser(), createUser)
// /id
router.get('/:id([0-9]{1,})', getUserById)
router.del('/:id([0-9]{1,})', deleteUserById)
// /login
router.post('/login', loginUser)

async function createUser(ctx) {
  const body = ctx.request.body
  let result = await model.createUser(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  } else {
    ctx.status = 201
    ctx.body = "{}"
  }
}

async function getAllUsers(ctx, next) {
  // const permission = can.readAll(ctx.state.user);
  // if (!permission.granted) {
  //   ctx.status = 403;
  // } else {
    //let users = await model.getAllUsers(20, 1)
    let users = await model.getAllUsers()
    if (users.length) {
      ctx.body = users
    }
  //}
}

async function getUserById(ctx) {
  let id = ctx.params.id
  let user = await model.getUserById(id)
  if (user.length) {
    ctx.body = user[0]
  }
}

async function loginUser(ctx) {
  // return any details needed by the client
  const {id, username, role} = ctx.state.user
  const links = {
    self: `https://${ctx.host}${prefix}/${id}`
  }
  ctx.body = {id, username, role, links};
}

async function deleteUserById(ctx){
  let id = ctx.params.id
  let result = await model.deleteUserById(id)
  if (result){
    ctx.status = 201
    ctx.body = `Deleted user with id ${id}`
  }
}
module.exports = router;
