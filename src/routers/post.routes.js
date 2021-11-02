const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');

const Post = require('../models/post.model');

const authRole = require('../middlewares/authRole');


// Get all post
// router.get('/', postController.getAllPost);

// create post
// only writer and admin can create post
router.get('/new', authRole(['admin', 'writer']), (req, res, next) => {
    res.render('new_post', {user: req.user});
});
router.post('/new', authRole(['admin', 'writer']), postController.create);

// get single post (read post)
router.get('/:post_id', postController.getPost);

// router.get('/new', postController)



// update post
// only writer and admin can update post
router.get('/:post_id/edit', authRole(['admin', 'writer']), (req, res, next) => {
    const post_id = req.params.post_id;
    Post.findById(post_id, (err, post) => {
        if(err) {
            res.json({message: 'Error to edit post', error: err})
        }
        if(post) {
            res.render('edit_post', {post: post, user: req.user})
        }
    })
})
router.patch('/:post_id/edit', authRole(['admin', 'writer']), postController.update);

// delete post
// only writer and admin can delete post
router.delete('/:post_id', authRole(['admin', 'writer']), postController.delete);


/**
 * Implement comment routes in post route
 */
router.post('/:post_id/comment', commentController.create)
router.get('/:post_id/comment', commentController.getPostComment)

/**
 * approve post
 */


module.exports = router;
