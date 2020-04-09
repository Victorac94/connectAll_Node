const jwt = require('jwt-simple');
const moment = require('moment');

// MIDDLEWARE to check the user is authenticated and the session has not expired yet
function isAuthenticated(req, res, next) {
    const token = req.headers['user-token'];

    if (token) {
        // User is registered
        const tokenDec = jwt.decode(token, process.env.SECRET_KEY);

        if (tokenDec.expires > moment().unix()) {
            next();
        } else {
            res.status(401).json('Your session has expired. Please login again.');
        }
    } else {
        // User has not registered yet or has deleted the token from localStorage
        res.status(401).json('Please, login or create an account to get started.');
    }
}

module.exports = {
    isAuthenticated: isAuthenticated
}