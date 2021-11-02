# Blog_App_with_user_writer_admin
Blog application in which you can create, read, and delete posts.

There are three type of users
1) End user 
2) Content writer 
3) Admin. 

End user can only ready and comment on posts. content writer can write posts, edit and delete his/her posts and also read other users posts. Admin can manage all type of user, admin can give permission to user as writer or admin, approve all post before that post is availabe to all user. 


# Installation
Clone this git repo on your local system

**Note:** this project is work on node.js as server side language and MySQL as database so before start project you must have node.js and MySQL installed on your local computer
- install node.js
- install MySQL

Once you have node.js and MySQL write below command on CMD(command prompt or terminal)

```node --version```

```mysql --version```

if both command return version number then it is successfully installed on you local computer

Now, open cloned repo goto **src/middlewares/connection.js** it's look like this
```
const mysql = require('mysql');

// Connect with database
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "blog_db"
})

mysqlConnection.connect((err) => {
    if(err){
        console.error('Connection failed: ', err.message);
    } else {
        console.log('Connected');
    }    
})

module.exports = mysqlConnection;
```

you have to change host, port, user, password, database attribute according to your mysql host, port, user, password, database

**note** you have to first create database on mysql here ex. "blog_bd" 

