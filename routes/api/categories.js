const jwt = require('jwt-simple');
const moment = require('moment');
const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/index');

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

// Get categories from search
// GET http://localhost:3000/api/categories/search
router.get('/search', isAuthenticated, async (req, res) => {
    try {
        const response = await Category.getCategoriesBySearch(req.headers['search-for']);
        res.json(response);
    } catch (err) {
        res.status(422).json(err);
    }
})

// Create a new category
// POST http://localhost:3000/api/categories
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const result = await Category.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(422).json(err);
    };
});

// Delete a category
// DELETE http://localhost:3000/api/categories
router.delete('/', isAuthenticated, async (req, res) => {
    try {
        const result = await Category.deleteById(req.body.id);
        res.json(result);
    } catch (err) {
        res.status(422).json(err);
    };
});

// Get categories the user follows
// GET http://localhost:3000/api/categories/follow
router.get('/follow', isAuthenticated, async (req, res) => {
    try {
        const result = await Category.getUserCategories(req.decodedUserToken['user-id']);
        res.json(result);
    } catch (err) {
        res.status(422).json(err);
    };
});

// Follow a new category
// POST http://localhost:3000/api/categories/follow
router.post('/follow', isAuthenticated, async (req, res) => {
    try {
        const userId = req.decodedUserToken['user-id'];

        const result = await UserCategory.add(userId, [req.body.categoryId])
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(422).json(err);
    }
})

// Unfollow a category
// DELETE http://localhost:3000/api/categories/user
router.delete('/user', isAuthenticated, async (req, res) => {
    try {
        const userId = req.decodedUserToken['user-id'];
        const category = req.headers['delete-category'];

        const result = await UserCategory.deleteUserCategory(userId, category);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(422).json(err);
    }
})

module.exports = router