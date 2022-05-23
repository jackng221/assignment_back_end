const dogs = require('./routes/dogs.js');
const users = require('./routes/users.js')

const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());
app.use(dogs.routes());
app.use(users.routes());

let port = process.env.PORT || 10888;

app.listen(port)

console.log('API is ready', port)