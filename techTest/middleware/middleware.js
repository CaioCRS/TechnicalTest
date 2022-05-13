
async function Auth(req, res, next) {
    
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).send('Invalid token');

    return next();
}

module.exports = Auth