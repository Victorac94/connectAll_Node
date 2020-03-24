const jwt = require('jwt-simple');
const moment = require('moment');
const router = require('express').Router();

const Category = require('../../models/category');
const UserCategory = require('../../models/user-category');

// Get all categories 
// GET http://localhost:3000/api/categories
router.get('/', async (req, res) => {
    try {
        const rows = await Category.getAll();
        res.json(rows);
    } catch (err) {
        res.status(422).json(err);
    };
});

// Create a new category
// POST http://localhost:3000/api/categories
router.post('/', async (req, res) => {
    try {
        const result = await Category.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(422).json(err);
    };
});

// Delete a category
// DELETE http://localhost:3000/api/categories
router.delete('/', async (req, res) => {
    try {
        const result = await Category.deleteById(req.body.id);
        res.json(result);
    } catch (err) {
        res.status(422).json(err);
    };
});

// Get categories the user follows
// GET http://localhost:3000/api/categories/follow
router.get('/follow', async (req, res) => {
    try {
        const user = jwt.decode(req.headers['user-token'], process.env.SECRET_KEY)
        // If user session has not expired
        if (user.expires > moment().unix()) {
            const result = await Category.getUserCategories(user['user-id']);
            console.log(result);
            res.json(result);
        } else {
            res.status(401).json('Your session has expired. Please login again.')
        }
    } catch (err) {
        res.status(422).json(err);
    };
});

// Delete user categories
// DELETE http://localhost:3000/api/categories/user
router.delete('/user', async (req, res) => {
    try {
        const user = jwt.decode(req.headers['user-token'], process.env.SECRET_KEY);
        // If user session has not expired
        if (user.expires > moment().unix()) {
            const userId = user['user-id'];
            const category = req.headers['delete-categories'];

            const result = await UserCategory.deleteUserCategory(userId, category);
            console.log(result);
            res.json(result);
        } else {
            res.status(401).json('Your session has expired. Please login again.');
        }
    } catch (err) {
        res.status(422).json(err);
    }
})

module.exports = router