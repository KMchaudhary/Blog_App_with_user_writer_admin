module.exports = (roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.role))
            next();
        else
            res.status(401).render('access_denied');
    }
} 