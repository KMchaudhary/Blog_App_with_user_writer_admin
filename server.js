
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const ejs = require('ejs')


const authRole = require('./src/middlewares/authRole');
const checkAuth = require('./src/middlewares/checkAuth');

const mysqlConnection = require('./src/middlewares/connection');    //setup connection with local mysql database

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'))
app.set('view engine', 'ejs');
// app.use('static', 'public');

app.use(express.urlencoded({extended: true}));  //parsing form data
app.use(express.json());    //parsing json data
app.use(cookieParser())     //parsing cookie data

// import all router
const userRouter = require('./src/routers/user.routes');
const postRouter = require('./src/routers/post.routes');
const homeRouter = require('./src/routers/home.routes');
const adminRouter = require('./src/routers/admin.routes');

// Routes which should handle request
app.get('/', (req, res, next) => {
    res.render('landing_page')
})
app.use('/user', userRouter)
app.use('/home', checkAuth, homeRouter)
app.use('/posts', checkAuth, postRouter)
app.use('/admin', checkAuth, authRole(['admin']), adminRouter)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT} \nVisit http://localhost:3000/`))