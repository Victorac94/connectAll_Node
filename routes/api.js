const router = require('express').Router();
const app = require('express')();
const jwt = require('jwt-simple');
const moment = require('moment');

const apiCategoriesRouter = require('./api/categories');
const apiUsersRouter = require('./api/users');
const apiPostsRouter = require('./api/posts');

// Check if the user's session has expired
app.use((req, res, next) => {
    const user = jwt.decode(req.headers['user-token']);
    console.log(user);

    if (user.expires > moment().unix()) {
        next();
    } else {
        res.status(401).json('Your session has expired. Please, login.');
    }
});

// http://localhost:3000/api
router.use('/categories', apiCategoriesRouter);
router.use('/users', apiUsersRouter);
router.use('/posts', apiPostsRouter);

module.exports = router;