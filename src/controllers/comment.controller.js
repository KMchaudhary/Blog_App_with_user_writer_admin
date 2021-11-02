const Comment = require('../models/comment.model');

exports.create = (req, res, next) => {
    const user_id = req.user.user_id;
    const post_id = req.params.post_id;
    const {comment, reply_to_comment} = req.body;
    
    if(!comment || !post_id || !user_id) {
        res.json({message: 'something messing to create comment'});
    }
    
    const newComment = new Comment({
        message: comment,
        post_id: post_id,
        user_id: user_id, 
        reply_to_comment: reply_to_comment
    })

    Comment.create(newComment, (err, comment) => {
        if(err) res.json({error: err})
        else res.json({message: 'new comment created'})
    })
}


exports.getPostComment = (req, res, next) => {
    const post_id = req.params.post_id;
    Comment.findPostComments(post_id, (err, comments) => {
        if(err) res.json({error: err})
        if(comments) {
            res.json({comments: comments});
        }
    })
}
