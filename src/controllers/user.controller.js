const User = require('../models/user.mode');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// only admin use this functionality
exports.findAll = (req, res, next) => {
    User.findAll((err, users) => {
        if (err) res.json({
            error: err
        });
        res.json({
            users: users
        });
    })
}

exports.create = (req, res, next) => {
    const {
        username,
        email,
        password,
        role
    } = req.body;
    if (!username || !email || !password || !role) {
        return res.json({
            message: 'Please fill all required fields!'
        });
    }

    User.findByEmail(email, (err, user) => {
        if (err) res.json({
            error: err
        });

        if (user) return res.json({
            message: 'User all ready exist'
        });

        bcrypt.hash(password, 10)
            .then(hash => {
                const newUser = new User({
                    name: username,
                    email: email,
                    password: hash,
                    role: role
                });
                User.create(newUser, (err, user) => {
                    if (err) res.json({
                        error: err
                    });
                    res.redirect('/user/login');
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    })
}

exports.login = (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.json({
            message: 'Please fill all required fields!'
        });
    }
    User.findByEmail(email, (err, user) => {
        if (err) res.json({
            error: err
        });
        if (user) {
            console.log('login use', user)
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        // Authenticate user
                        const token = jwt.sign({
                                name: user.name,
                                email: user.email,
                                user_id: user.user_id,
                                role: user.role
                            },
                            'this is jwt secrete', {
                                expiresIn: '1h'
                            }
                        )
                        res.cookie('jwt', token);
                        if(user.role === 'admin') res.redirect('/admin');
                        res.redirect('/home');   //redirect user to home page
                    } else {
                        res.status(401).json({
                            message: 'Auth failed'
                        })
                    }
                })
        } else {
            return res.json({
                message: 'User all ready exist'
            });
        }
    })
}

exports.findOne = (req, res, next) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) res.json({
            error: err
        });
        res.json({
            user: user
        });
    })
}

exports.updateRole = (req, res, next) => {
    const {
        id,
        role
    } = req.body;
    if (!id || !role) {
        return res.json({
            message: 'Something missing either user_id, or role'
        });
    }
    if (role == 'user' || role == 'writer' || role == 'admin')
        User.updateRole(id, role, (err, user) => {
            if (err) res.json({
                error: err
            });
            res.json({
                message: 'User updated successfully.',
                user: user
            })
        })
    else
        res.json({
            message: 'role should be (user or writer or admin)'
        })
}

exports.delete = (req, res, next) => {
    const user_id = req.params.id;

    if (!id) {
        return res.json({
            message: 'user_id is missing for delete user'
        });
    }
    User.delete(id, role, (err, user) => {
        if (err) res.json({
            error: err
        });
        res.json({
            message: 'User successfully deleted'
        })
    })
}

exports.displayLogin = (req, res, next) => {
    res.render('login')
}

exports.displaySignUp = (req, res, next) => {
    res.render('login')
}