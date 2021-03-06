const router = require('express').Router();
const jwt = require('jwt-simple');

const apiCategoriesRouter = require('./api/categories');
const apiUsersRouter = require('./api/users');
const apiPostsRouter = require('./api/posts');


// http://localhost:3000/api
router.use('/categories', apiCategoriesRouter);
router.use('/users', apiUsersRouter);
router.use('/posts', apiPostsRouter);

// Return logged in user id
// GET http://localhost:3000/api/get-my-id
router.get('/get-my-id', (req, res) => {
    const user = jwt.decode(req.headers['user-token'], process.env.SECRET_KEY);

    console.log(user);
    res.json(user['user-id']);
})

module.exports = router;