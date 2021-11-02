const dbConn = require('../middlewares/connection');

// create user object
const Post = function (post) {
    this.title = post.title,
    this.description = post.description,
    this.body = post.body;
    this.creator_id = post.creator_id,
    this.approved = 0
}

Post.create = (newPost, result) => {
    dbConn.query("INSERT INTO post set ?", newPost, (err, res) => {
        if(err) result(err, null)
        else result(null, result);
    })
}

Post.findById = (id, result) => {
    dbConn.query("SELECT * FROM post WHERE post_id=?", id, (err, res) => {
        if(err) result(err, null)
        else result(null, res[0]);
    })
}

Post.findAll = (result) => {
    dbConn.query("SELECT * FROM post", (err, res) => {
        if(err) result(err, null)
        else result(null, res);
    })
}

Post.findPendingPosts = (result) => {
    const query = 
    `SELECT post.post_id, post.title, post.body, post.description, post.creator_id, post.published_at, user.name as creator_name
    FROM post
    INNER JOIN user ON post.creator_id = user.user_id
    WHERE post.approved=0`;

    dbConn.query(query, (err, res) => {
        if(err) result(err, null)
        else result(null, res);
    })
}

Post.findApprovedPosts = (result) => {
    const query = 
    `SELECT post.post_id, post.title, post.body, post.description, post.creator_id, post.published_at, user.name as creator_name
    FROM post
    INNER JOIN user ON post.creator_id = user.user_id
    WHERE post.approved=1
    ORDER BY post.created_at DESC`;

    dbConn.query(query, (err, res) => {
        if(err) result(err, null)
        else result(null, res);
    })
}

Post.findWriterPosts = (creator_id, result) => {
    const query = 
    `SELECT post.post_id, post.title, post.body, post.description, post.creator_id, post.published_at, user.name as creator_name
    FROM post
    INNER JOIN user ON post.creator_id = user.user_id
    WHERE creator_id= ?`;

    dbConn.query(query, creator_id, (err, res) => {
        if(err) result(err, null)
        else result(null, res);
    })
}

Post.update = (id, {title, description, body},result) => {
    dbConn.query("UPDATE post SET title=?, description=?, body=? WHERE post_id=?", [title, description, body, id], (err, res) => {
        if(err) result(err, null)
        else result(null, res);
    })
}

// only admin can approved
Post.approve = (id, result) => {
    dbConn.query("UPDATE post SET approved=1 WHERE post_id=?", id, (err, res) => {
        if(err) result(err, null)
        else result(null, res);
    })
}

// only creator and admin can delete post
Post.delete = (id, result) => {
    dbConn.query("DELETE FROM post WHERE post_id=?", id, (err, res) => {
        if(err) result(err, null)
        else result(null, res);
    })
}

module.exports = Post;