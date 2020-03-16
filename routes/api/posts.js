const router = require('express').Router();

const Post = require('../../models/post');

// http://localhost:3000/api/posts
router.get('/', (req, res) => {
    Post.getAll().then(result => {
        console.log(result);
    })
    res.json(result);
})