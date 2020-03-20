const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');


const User = require('../../models/user');
const userCategories = require('../../models/user-category');

// http://localhost:3000/api/users/register
router.post('/register', [
    check('name', 'El nombre de usuario debe estar entre 3 y 15 caracteres').isLength({ min: 3, max: 15 }).isAlphanumeric(),
    check('lastName', 'El apellido debe estar entre 3 y 30 caracteres').isLength({ min: 3, max: 30 }).isAlphanumeric(),
    check('email', 'El formato de email no es correcto').isEmail(),
    check('password', 'La password debe tener entre 4 y 16 caracteres').custom((value) => {
        return (/^[a-zA-Z0-9@*#]{4,16}$/).test(value);
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

        const result = await User.create(req.body);

        // If the user has been created correctly
        if (result.affectedRows === 1) {
            // Add the categories the user follows to the DB
            await userCategories.add(result.insertId, req.body.categories);

            // Create user token
            const payload = {
                'user-id': result.insertId,
                'expires': moment().add(1, 'days').unix()
            };
            const token = jwt.encode(payload, process.env.SECRET_KEY);

            // Respond success
            res.json({ status: 200, token: token });
        }
    } catch (err) {
        res.status(400).json(err);
    }

});

module.exports = router;