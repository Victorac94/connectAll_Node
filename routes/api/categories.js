const router = require('express').Router();
const Category = require('../../models/category');

//GET http://localhost:3000/api/categories
router.get('', async (req, res) => {
    const rows = await Category.getAll();
    res.json(rows);
});

//POST http://localhost:3000/api/categories
router.post('/', async (req, res) => {
    const result = await Category.create(req.body);
    res.json(result);
});

//DELETE http://localhost:3000/api/categories
router.delete('/', async (req, res) => {
    const result = await Category.deleteById(req.body.id);
    res.json(result);
})

module.exports = router