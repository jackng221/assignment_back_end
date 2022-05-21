const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = Router({prefix: '/api/v1'});

router.get('/', dogShelterAPI);

function dogShelterAPI(ctx, next){  //context
  ctx.body = {
    message: "Welcome to Dog Shelter API"
  }
}

module.exports = router;