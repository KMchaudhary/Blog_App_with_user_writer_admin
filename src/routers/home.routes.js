const express = require('express')
const router = express.Router()
// const postController = require('../controllers/post.controller');
const Post = require('../models/post.model');
const checkRole = require('../middlewares/authRole');

// get home page
router.get('/', checkRole(['user', 'writer']), (req, res, next) => {
    // get all posts
    Post.findApprovedPosts((err, posts) => {
        if(err) {
            res.status(500).json({message: 'Error to find all posts', error: err})
        }
        if(posts) {
            res.render('home', {posts: posts, user: req.user});
        }
    })
})

// get writer posts only
router.get('/my_posts', checkRole(['admin', 'writer']), (req, res, next) => {
    const user_id = req.user.user_id;
    Post.findWriterPosts(user_id, (err, posts) => {
        if(err) {
            res.status(500).json({message: 'Error to find all posts', error: err})
        }
        if(posts) {
            console.log(req.user);
            res.render('my_posts', {posts: posts, user: req.user});
        }
    }
    )
})

module.exports = router;