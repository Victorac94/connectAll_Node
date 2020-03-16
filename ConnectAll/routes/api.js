const router = require('express').Router();

const apiCategoriasRouter = require('./api/categorias');
const apiUsuariosRouter = require('./api/usuarios');

router.use('/categorias', apiCategoriasRouter);
router.use('/usuarios', apiUsuariosRouter);

module.exports = router;