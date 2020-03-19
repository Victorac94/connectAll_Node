const router = require('express').Router();

const apiCategoriasRouter = require('./api/categorias');
const apiUsuariosRouter = require('./api/usuarios');
const apiPostsRouter = require('./api/posts');

router.use('/categorias', apiCategoriasRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/posts', apiPostsRouter);

module.exports = router;