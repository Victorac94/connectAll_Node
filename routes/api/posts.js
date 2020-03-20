const router = require('express').Router();

const Post = require('../../models/post');

// Get all posts
// GET http://localhost:3000/api/posts
router.get('/', (req, res) => {
    Post.getAll().then(result => {
        console.log(result);
        res.json(result);
    });
});

// Add a new post
// POST http://localhost:3000/api/posts/add
router.post('/new', (req, res) => {
    Post.add(req.body).then(result => {
        console.log(result);
        res.json(result);
    });
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
        console.log(response);
        res.json(response);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

module.exports = router;