var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    var token = req.headers['x-access-token'];

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(err){
                return res.json({ message: 'Token Mismatch. Unauthorized Access.'});
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({ message: 'Unauthorized access.'});
    }
};
