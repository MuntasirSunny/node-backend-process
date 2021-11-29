const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        //const token = req.body.token;
        console.log('Auth check at -' + Date.now().valueOf() / 1000);

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                //console.log(err);
                res.send(err)
            } else {
                req.userData = decoded;
                //console.log(req.userData);
                next();
            }
        });
        
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!',
            error: error
        })
    }
}