const router = require('express').Router();

const Post = require('../../models/post');

// http://localhost:3000/api/posts
router.get('/', (req, res) => {
    Post.getAll().then(result => {
        console.log(result);
        res.json(result);
    });
});

// http://localhost:3000/api/posts/add
router.post('/new', (req, res) => {
    Post.add(req.body).then(result => {
        console.log(result);
        res.json(result);
    });
});

// http://localhost:3000/api/posts/edit
router.put('/edit', (req, res) => {
    Post.edit(req.body).then(result => {
        console.log(result);
        res.json(result);
    });
});

// http://localhost:3000/api/posts/delete
router.delete('/delete', (req, res) => {
    Post.deletePost(req.body).then(result => {
        console.log(result);
        res.json(result);
    });
});

module.exports = router;