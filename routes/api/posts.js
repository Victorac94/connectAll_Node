const router = require('express').Router();
const jwt = require('jwt-simple');
const moment = require('moment');

const Post = require('../../models/post');

// MIDDLEWARE to check the user is authenticated
router.use((req, res, next) => {
    const token = req.headers['user-token'];
    const tokenDec = jwt.decode(token, process.env.SECRET_KEY);

    if (tokenDec.expires > moment().unix()) {
        next();
    } else {
        res.status(401).json('Your session has expired. Please login again.')
    }
})

// Get all posts
// GET http://localhost:3000/api/posts
router.get('/', (req, res) => {
    Post.getAll().then(result => {
        res.json(result);
    });
});

// Get posts from search
// GET http://localhost:3000/api/posts/search
router.get('/search', async (req, res) => {
    try {
        const response = await Post.getPostsBySearch(req.headers['search-for']);
        res.json(response);
    } catch (err) {
        res.status(422).json(err);
    }
})

// Add a new post
// POST http://localhost:3000/api/posts/new
router.post('/new', async (req, res) => {
    try {
        const user = jwt.decode(req.headers['user-token'], process.env.SECRET_KEY);
        req.body.fk_user = user['user-id'];

        const response = await Post.add(req.body);
        res.json(response);
    } catch (err) {
        res.status(422).json(err);
    }
});

// Edit a post
// PUT http://localhost:3000/api/posts/edit
router.put('/edit', (req, res) => {
    Post.edit(req.body).then(result => {
        console.log(result);
        res.json(result);
    });
});

// Delete a post
// DELETE http://localhost:3000/api/posts/delete
router.delete('/delete', (req, res) => {
    Post.deletePost(req.body).then(result => {
        console.log(result);
        res.json(result);
    });
});

// Get posts from a category
// GET http://localhost:3000/api/posts/category/:categoryId
router.get('/category/:categoryId', async (req, res) => {
    try {
        const response = await Post.getPostsByCategory(req.params.categoryId);
        res.json(response);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});


module.exports = router;