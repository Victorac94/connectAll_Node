const router = require('express').Router();
const Categoria = require('../../models/categoria');

//GET http://localhost:3000/api/categorias
router.get('', async (req, res) => {
    const rows = await Categoria.getAll();
    res.json(rows);
});

//POST http://localhost:3000/api/categorias
router.post('/', async (req, res) => {
    const result = await Categoria.create(req.body);
    res.json(result);
});

//DELETE http://localhost:3000/api/categorias
router.delete('/', async (req, res) => {
    const result = await Categoria.deleteById(req.body.id);
    res.json(result);
})

module.exports = router