const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/article' });
const {
  find, create, update, delete: del, findById
} = require('../controllers/article');

const { secret } = require('../config');

const auth = jwt({ secret });

router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
router.patch('/:id', update);
router.delete('/:id', del);

module.exports = router;