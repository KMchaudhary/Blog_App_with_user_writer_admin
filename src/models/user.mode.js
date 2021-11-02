const dbConn = require('../middlewares/connection');

// create user object
const User = function (user) {
    this.name = user.name,
    this.email = user.email,
    this.password = user.password,
    this.role = user.role
}

User.create = (newUser, result) => {
    dbConn.query("INSERT INTO user set ?", newUser, (err, res) => {
        if(err) {
            console.error('Error while Sig Up', err.message);
            result(err, null)
        } else {
            console.log(res)
            result(null, res)
        }
    })
}

User.findById = (id, result) => {
    dbConn.query("SELECT * FROM user WHERE user_id=?", id, (err, res) => {
        if(err) {
            console.error('Error while Sig Up', err.message);
            result(err, null)
        } else {
            console.log('find user: ', res)
            result(null, res)
        }
    })
}

User.findByEmail = (email, result) => {
    dbConn.query("SELECT * FROM user WHERE email=?", email, (err, res) => {
        if(err) {
            console.error('Error while Sig Up: ', err.message);
            result(err, null)
        } else {
            if(res.length == 0)
                result(null, null)
            else
                result(null, res[0])
        }
    })
}

// only admin can see all user
User.findAll = (result) => {
    dbConn.query("SELECT * FROM user", (err, res) => {
        if(err) {
            console.error('Error while Sig Up', err.message);
            result(err, null)
        } else {
            console.log('All user: ', res)
            result(null, res)
        }
    })
}

//
User.findAllUser = (result) => {
    dbConn.query("SELECT name, email, role FROM user where role=?", 'user', (err, res) => {
        if(err) {
            console.error('Error while Sig Up', err.message);
            result(err, null)
        } else {
            console.log('All user: ', res)
            result(null, res)
        }
    })
}

// 
User.findAllWriter = (result) => {
    dbConn.query("SELECT name, email, role FROM user where role=?", 'writer', (err, res) => {
        if(err) {
            console.error('Error while Sig Up', err.message);
            result(err, null)
        } else {
            console.log('All user: ', res)
            result(null, res)
        }
    })
}

// only update role of user only admin should change role of user
User.update = (id, role, result) => {
    console.log('CALLED TO UPDATE USER');
    dbConn.query("UPDATE user SET role=? WHERE user_id=?", [role, id], (err, res) => {
    
        if(err) {
            console.error('Error while Sig Up', err.message);
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.delete = (id, result) => {
    dbConn.query("DELETE FROM user WHERE user_id=?", id, (err, res) => {
        if(err) {
            if(err) {
                console.error('Error while Sig Up', err.message);
                result(err, null)
            } else {
                console.log('Delete user: ', res)
                result(null, res)
            }
        }
    })
}

module.exports = User;