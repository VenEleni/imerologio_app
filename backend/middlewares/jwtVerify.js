const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token'); //we take the token from the custom header 'x-auth-token'
    console.log ("token is: ", token)
    if (!token) { //check if the token exists 
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //we .verify the token using our secret key from .env
        req.user = decoded.user; //inside the token there are info about the user who send it. so here we save info about the user who send the token
        console.log("auth decoded user: ", decoded.user);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
