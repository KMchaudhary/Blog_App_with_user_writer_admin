const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(token == null) return res.status(401).redirect('/user/login');
        // if(token == null) return res.redirect('/user/login');
        
        jwt.verify(token, 'this is jwt secrete', (err, user) => {
            if(err) return res.status(403).json({message: 'Auth fail'});
            // if(err) return res.redirect('/user/login');
            req.user = user;
            next();
        })
    } catch(err) {
        throw err;
    }
}