const Koa = require('koa');
const Router = require('koa-router');
//const static = require('koa-static-router');
const app = new Koa();
const router = new Router();

router.get('/api/v1', dogShelterAPI);
app.use(router.routes());

let port = process.env.PORT || 10888;


function dogShelterAPI(ctx, next){
  ctx.body = {
    message: "Welcome to Dog Shelter API"
  }
}

app.listen(port)

console.log('API is ready', port)