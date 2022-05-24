const dogs = require('./routes/dogs.js');
const users = require('./routes/users.js');
const uploads = require('./routes/uploads.js');

const Koa = require('koa');
const static = require('koa-static-router');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());
app.use(dogs.routes());
app.use(users.routes());
app.use(uploads.routes());
app.use(static({dir:'docs', router: '/doc/'}) );

let port = process.env.PORT || 10888;

app.listen(port)

console.log('API is ready', port)