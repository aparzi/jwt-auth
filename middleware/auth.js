const fs = require('fs');
const jwt = require('jsonwebtoken');

const isAuthenticated = function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        console.log(req.headers);
        let token = req.headers.authorization.split(' ')[1];
        console.log(token);
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        // Here we validate that the JSON Web Token is valid and has been
        // created using the same private pass phrase
        jwt.verify(token, privateKey, (err, user) => {
            // if there has been an error...
            if (err) {
                // shut them out!
                res.status(500).json({error: err});
                throw new Error(err);
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error
        res.status(403).json({error: "Not Authorized"});
        throw new Error("Not Authorized");
    }
};

module.exports = isAuthenticated;