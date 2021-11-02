const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

exports.getAllPost = (req, res, next) => {
    Post.findAll((err, posts) => {
        if(err) {
            res.json({message: 'Error to find all posts', error: err})
        }
        if(posts) {
            res.json({posts: posts})
        }
    })
}

exports.getPost = (req, res, next) => {
    const post_id = req.params.post_id;
    Post.findById(post_id, (err, post) => {
        if(err) {
            return res.json({message: 'Error to find posts', error: err})
        }
        if(post) {
            Comment.findPostComments(post_id, (err, comments) => {
                console.log(comments);
                if(err) return res.json({error: err})
                if(comments) return res.render('read_post', {post: post, comments: comments, user: req.user});
                else return res.render('read_post', {post: post, comments: [], user: req.user})
            })
        }
    });
}

exports.create = (req, res, next) => {
    let {title, description, body} = req.body;
    let creator_id = req.user.user_id;
    title = title.trim()
    description = description.trim()
    body = body.trim()
    if(title === '' || typeof(title) == 'undefined')    
        title = 'Untitled'

    const newPost = new Post({
        title: title,
        description: description,
        body: body,
        creator_id: creator_id
    })

    Post.create(newPost, (err, post) => {
        if(err) {
            res.json({message: 'Error to create posts', error: err});
        }
        if(post) {
            res.redirect('/home/my_posts');
        }
    })
}

exports.update = (req, res, next) => {
    const post_id = req.params.post_id;
    let {title, description, body} = req.body;
    // title = title.trim()
    // description = description.trim()
    // body = body.trim()
    console.log("req body", req.body);

    Post.update(post_id, {title, description, body}, (err, post) => {
        if(err) {
            res.json({message: 'Error to update post', error: err});
        }
        if(post) {
            res.json({message: 'Post updated successfully', post_id: post.insertId});
        }
    })
}

exports.delete = (req, res, next) => {
    const post_id = req.params.post_id;

    Post.delete(post_id, (err, post) => {
        if(err) {
            res.json({message: 'Error to delete post', error: err});
        }
        if(post) {
            if(post.affectedRows == 0) return res.status(404).json({message: 'Post already deleted'})
            res.json({message: 'Post deleted successfully', post_id: post.insertId});
        }
    })
}

exports.approve = (req, res, next) => {
    const post_id = req.params.post_id;
    Post.approve(post_id, (req, post) => {
        if(err) {
            res.json({message: 'Error to delete post', error: err});
        }
        if(post) {
            res.json({message: 'Post approved by admin', post_id: post.insertId});
        }
    })
}