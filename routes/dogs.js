const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router({prefix: '/api/v1/dogs'});

let dogs = [
  {name:'A'},
  {name:'B'},
  {name:'C'}
]

// GET /
router.get('/', getAll);
// POST /
router.post('/', bodyParser(), createDogEntry)
// GET /id
router.get('/:id([0-9]{1,})', getDogEntry)
// PUT /id
router.get('/:id([0-9]{1,})', bodyParser(), updateDogEntry)
// DEL /id
router.get('/:id([0-9]{1,})', deleteDogEntry)


function getAll(cnx, next){
  cnx.body={
    dogs
  }
}
function createDogEntry(cnx, next){
  let {name} = cnx.request.body;
  let newDogEntry = {name:name};
  dogs.push(newDogEntry)
  
  cnx.status = 201;  //created
  cnx.body = newDogEntry
}
function getDogEntry(cnx, next){
  let id = cnx.params.id;
  
  if (id > 0 && id <= dogs.length){
    cnx.body = dogs[id-1];
  }
  else{
    cnx.status = 404;  //not found
  }
}
function updateDogEntry(cnx, next){
    cnx.body={
    
  }
}
function deleteDogEntry(cnx, next){
    cnx.body={
    
  }
}

module.exports = router;