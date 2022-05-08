const User = require('./user');
const Post = require('./posts');
const Comments = require('./comments');

User.hasMany(Post, {
    foreignKey: 'post_id',
});

Post.belongsTo(User, {
    foreignKey: 'post_id',
});



Post.hasMany(Comments, {
    foreignKey: 'post_id',
});



Comments.belongsTo(User, {
    foreignKey: 'user_id',
});



module.exports = { User, Post, Comments };