const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');

const { isAuthenticated } = require('../../middlewares/index');


const User = require('../../models/user');
const Post = require('../../models/post');
const Category = require('../../models/category');
const userCategories = require('../../models/user-category');


// http://localhost:3000/api/users/register
router.post('/register', [
    check('name', 'El nombre de usuario debe estar entre 3 y 15 caracteres').isLength({ min: 3, max: 15 }).custom((value) => {
        return (/^[a-zA-Z0-9@*# ]{3,15}$/).test(value);
    }),
    check('lastName', 'El apellido debe estar entre 3 y 30 caracteres').isLength({ min: 3, max: 30 }).custom((value) => {
        return (/^[a-zA-Z0-9@*# ]{3,30}$/).test(value);
    }),
    check('email', 'El formato de email no es correcto').isEmail(),
    check('password', 'La password debe tener entre 4 y 16 caracteres').custom((value) => {
        return (/^[a-zA-Z0-9@*# ]{4,16}$/).test(value);
    }),
    /* Check the format of the categories array received is correct.
        -Correct: [1, 20, 3] or [1] or [200, 300, 1]
        -Incorrect: [0] or [01, 2] or [] or [1,2] or {1, 2} or (1, 2)
    */
    check('categories', 'Las categorias seleccionadas no son correctas. Vuelvelas a elegir').isArray().custom(value => /[1-9][0-9]*/g.test(value))
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        req.body.password = bcrypt.hashSync(req.body.password, 10); // El 10 es el número de veces que encripta la contraseña

        const userCreated = await User.create(req.body);

        // If the user has been created correctly
        if (userCreated.affectedRows === 1) {
            // Add the categories the user follows to the DB
            await userCategories.add(userCreated.insertId, req.body.categories);
            const user = await User.getUserById(userCreated.insertId);
            console.log(user);
            // Create user token
            const payload = {
                'user-id': userCreated.insertId,
                'expires': moment().add(1, 'days').unix()
            };
            const token = jwt.encode(payload, process.env.SECRET_KEY);

            // Respond success
            res.json({ status: 200, token: token, user: user });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', [
    check('email', 'El formato de email no es correcto').isEmail(),
    check('password', 'La password debe tener entre 4 y 16 caracteres').custom((value) => {
        return (/^[a-zA-Z0-9@*# ]{4,16}$/).test(value);
    })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }

        const user = await User.getUserByEmail(req.body.email);

        // Check user email exists in DB
        if (user.user_email !== req.body.email) {
            res.status(401).json('Incorrect email or password')
        } else {
            // Check user password is correct
            const passwordsMatch = bcrypt.compareSync(req.body.password, user.user_password);

            if (!passwordsMatch) {
                res.status(401).json('Incorrect email or password')
            } else {
                // User email and password are correct. Create token
                const payload = {
                    'user-id': user.id,
                    'expires': moment().add(1, 'days').unix()
                }
                const userInfo = await User.getUserById(user.id)
                const token = jwt.encode(payload, process.env.SECRET_KEY);

                res.json({ status: 200, token: token, user: userInfo })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(422).json(err);
    }
});

// Get profiles from search
// GET - http://localhost:3000/api/users/search
router.get('/search', isAuthenticated, async (req, res) => {
    try {
        const response = await User.getUsersBySearch(req.headers['search-for']);
        res.json(response);
    } catch (err) {
        res.status(422).json(err);
    }
})

// Get my basic info
// GET - http://localhost:3000/api/users/basic
router.get('/basic', isAuthenticated, async (req, res) => {
    // Decode user token
    const user = jwt.decode(req.headers['user-token'], process.env.SECRET_KEY);

    try {
        const userInfo = await User.getUserById(user['user-id']);

        res.json(userInfo);
    } catch (err) {
        res.status(422).json(err);
    }
})

// Get my profile info
// GET - http://localhost:3000/api/users/:userId
router.get('/:userId', isAuthenticated, async (req, res) => {
    // Decode user token
    const userInfo = jwt.decode(req.headers['user-token'], process.env.SECRET_KEY);
    const userId = parseInt(req.params.userId);
    const myProfile = userInfo['user-id'] === userId ? true : false;

    try {
        // const fullUser = await User.getFullUserById(userInfo['user-id']);
        const user = await User.getUserById(userId);
        const posts = await Post.getPostsByUserId(userId);
        const categories = await Category.getUserCategories(userId);

        console.log(user, posts, categories);
        res.json({ user: user, posts: posts, categories: categories, myProfile: myProfile });
    } catch (err) {
        res.status(422).json(err);
    }
});

// Update profile info
// PUT - http://localhost:3000/api/users/my-profile
router.put('/my-profile', isAuthenticated, async (req, res) => {
    const userToken = jwt.decode(req.headers['user-token'], process.env.SECRET_KEY);

    try {
        console.log(req.body);

        const result = await User.updateUserInfo(userToken['user-id'], req.body);
        console.log(result);
        res.json(result);

    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;