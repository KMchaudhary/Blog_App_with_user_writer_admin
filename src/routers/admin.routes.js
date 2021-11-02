const express = require('express')
const router = express.Router();

const User = require('../models/user.mode');
const Post = require('../models/post.model');

router.get('/', (req, res, next) => {
    Post.findApprovedPosts((err, posts) => {
        if(err) {
            res.status(500).json({message: 'Error to find all posts', error: err})
        }
        if(posts) {
            res.render('admin', {posts: posts, user: req.user, page: {title: 'posts'}});
        }
    })
});

router.get('/my_posts', (req, res, next) => {
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

router.get('/pending_posts', (req, res, next) => {
    Post.findPendingPosts((err, posts) => {
        if(err) {
            res.status(500).json({message: 'Error to find pending posts', error: err})
        }
        if(posts) {
            res.render('pending_posts', {posts: posts, user: req.user, page: {title: 'pending_posts'}});
        }
    })
})

router.get('/users', (req, res, next) => {
    User.findAll((err, users) => {
        if(err) {
            res.status(500).json({message: 'Error to find all user', error: err})
        }
        if(users) {
            res.render('admin_users', {users: users, user: req.user, page: {title: 'users'}});
        }
    })
})

router.patch('/users/update', (req, res, next) => {
    const {user_id, role} = req.body;
    User.update(user_id, role, (err, user) => {
        if(err) {
            res.status(500).json({message: 'Error to find all user', error: err})
        }
        if(user) {
            res.json({message: 'User role updated successfully'});
        }
    })
})

router.patch('/posts/:post_id/approve', (req, res, next) => {
    const post_id = req.params.post_id
    Post.approve(post_id, (err, post) => {
        if(err) {
            res.status(500).json({message: 'Error to approve post', error: err})
        }
        if(post) {
            res.json({message: 'post approved by admin'});
        }
    })
})


module.exports = router;