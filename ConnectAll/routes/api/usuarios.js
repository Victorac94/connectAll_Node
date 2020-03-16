const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');


const Usuario = require('../../models/usuario');

router.post('/register', [
    check('username', 'El nombre de usuario debe estar entre 3 y 15 caracteres').isLength({ min: 3, max: 15 }).isAlphanumeric(),
    check('email', 'El email no está bien puesto').isEmail(),
    check('password', 'La password debe tener entre 4 y 8 caracteres').custom((value) => {
        return (/^(?=.*\d).{4,8}$/).test(value);
    })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }

    const passwordEnc = bcrypt.hashSync(req.body.password, 10);     //el 10 es el número de veces que encripta la contraseña
    req.body.password = passwordEnc
    const result = await User.create(req.body);
    res.json(result);
});

module.exports = router;