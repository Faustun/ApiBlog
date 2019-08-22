const Router = require('koa-router');
const router = new Router({ prefix: '/comment' });
const {
    find, create, delete: del
} = require('../controllers/comment');

router.get('/', find);
router.post('/', create);
router.delete('/:id', del);

module.exports = router;