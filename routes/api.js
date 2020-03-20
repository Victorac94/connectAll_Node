const router = require('express').Router();

const apiCategoriesRouter = require('./api/categories');
const apiUsersRouter = require('./api/users');
const apiPostsRouter = require('./api/posts');

// http://localhost:3000/api
router.use('/categories', apiCategoriesRouter);
router.use('/users', apiUsersRouter);
router.use('/posts', apiPostsRouter);

module.exports = router;