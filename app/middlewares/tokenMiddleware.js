var jwt = require('jsonwebtoken');

/**
 * Verify token in the HTTP request before serving the request
 */
module.exports = function(req, res, next){

    var token = req.body.wt || req.query.wt || req.headers['x-access-token'];

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(err){
                return res.status(403).json({ message: 'Token Mismatch. Unauthorized Access.'});
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).json({ message: 'Unauthorized access.'});
    }
};
