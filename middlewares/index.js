// MIDDLEWARE to check the user is authenticated and the session has not expired yet
function isAuthenticated(req, res, next) {
    const token = req.headers['user-token'];
    const tokenDec = jwt.decode(token, process.env.SECRET_KEY);

    if (tokenDec.expires > moment().unix()) {
        next();
    } else {
        res.status(401).json('Your session has expired. Please login again.')
    }
}

module.exports = {
    isAuthenticated: isAuthenticated
}