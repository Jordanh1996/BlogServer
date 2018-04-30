const User = require('./user');
const Blog = require('./blog');
const Message = require('./message');

// User -- Blog
User.hasMany(Blog);
Blog.belongsTo(User);

// Message -- User - Blog
Message.belongsTo(Blog);
Message.belongsTo(User);
Blog.hasMany(Message);
User.hasMany(Message);

module.exports = {
    User,
    Blog,
    Message
};
