const dbConn = require('../middlewares/connection');

const Comment = function (comment) {
    this.message = comment.message,
    this.post_id = comment.post_id,
    this.user_id = comment.user_id,
    this.reply_to_comment = comment.reply_to_comment
}

Comment.create = (newComment, result) => {
    dbConn.query("INSERT INTO comment set ?", newComment, (err, res) => {
        if(err) result(err, null)
        else result(null, result);
    })
}

Comment.delete = (id, result) => {
    dbConn.query("DELETE FROM post WHERE post_id=?", id, (err, res) => {
        if(err) result(err, null)
        else result(null, result);
    })
}

Comment.findPostComments = async (post_id, result) => {
    const query = `SELECT comment.comment_id, comment.message, comment.post_id, comment.reply_to_comment, comment.user_id, user.name
                   FROM user
                   INNER JOIN comment ON user.user_id = comment.user_id WHERE comment.post_id=? AND comment.reply_to_comment IS NULL`;
    
    dbConn.query(query, post_id, (err, res) => {
        if(err) result(err, null)
        if(res) {
            if(res.length == 0) return result(null, null)
            else {
                let i=0;
                res.forEach(x => {
                    const query2 = `SELECT comment.comment_id, comment.message, comment.post_id, comment.reply_to_comment, comment.user_id, user.name
                                    FROM comment
                                    INNER JOIN user ON user.user_id = comment.user_id WHERE comment.reply_to_comment=?`;
                    dbConn.query(query2, x.comment_id, (err, res2) => {
                        if(err) result(err, null)
                        else {
                            x.reply = res2;
                            i++;
                            if(i == res.length) return result(null, res);
                        }
                    })
                })
            }            
        }
    })
}


module.exports = Comment;