const router = require('express').Router();
const jwt = require('jwt-simple');

const { isAuthenticated } = require('../../middlewares/index');

const Post = require('../../models/post');


// Get all posts
// GET http://localhost:3000/api/posts
router.get('/', isAuthenticated, (req, res) => {
    Post.getAll().then(result => {
        res.json(result);
    });
});

// Get posts from search
// GET http://localhost:3000/api/posts/search
router.get('/search', isAuthenticated, async (req, res) => {
    try {
        const response = await Post.getPostsBySearch(req.headers['search-for']);
        res.json(response);
    } catch (err) {
        res.status(422).json(err);
    }
})

// Add a new post
// POST http://localhost:3000/api/posts/new
router.post('/new', isAuthenticated, async (req, res) => {
    try {
        req.body.fk_user = req.decodedUserToken['user-id'];

        const response = await Post.add(req.body);
        res.json(response);
    } catch (err) {
        res.status(422).json(err);
    }
});

// Edit a post
// PUT http://localhost:3000/api/posts/edit
router.put('/edit', isAuthenticated, async (req, res) => {
    try {
        const response = await Post.edit(req.body);
        console.log(response);
        res.json(response);
    } catch (err) {
        res.status(422).json(err);
    }
});

// Delete a post
// DELETE http://localhost:3000/api/posts/delete
router.delete('/delete', isAuthenticated, async (req, res) => {
    try {
        const post = JSON.parse(req.headers.post);

        if (post.user_id === req.decodedUserToken['user-id']) {
            const response = await Post.deletePost(post);
            res.json(response);
        }
        else {
            res.status(422).json('Could not delete the post');
        }
    } catch (err) {
        res.status(422).json(err);
    }
});

// Get posts from a category
// GET http://localhost:3000/api/posts/category/:categoryId
router.get('/category/:categoryId', isAuthenticated, async (req, res) => {
    try {
        const response = await Post.getPostsByCategory(req.params.categoryId);
        res.json(response);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});


module.exports = router;