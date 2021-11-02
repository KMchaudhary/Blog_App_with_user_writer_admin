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