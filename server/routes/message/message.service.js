const _ = require('lodash');
const { Blog } = require('../../models/blog');

const lodashAddMessage = (body) => {
    return _.pick(body, ['blogID', 'content'])
};

const addMessage = (content, blogID, userID, username) => {
    return new Promise((resolve, reject) => {
        console.log(blogID)
        Blog.findById(blogID).then((blog) => {
            const message = {
                content,
                _creator: userID,
                _creatorUser: username,
                _createdAt: new Date().getTime()
            };
            console.log(message);
            blog.messages.push(message);
            console.log('pushed')
            blog.save().then((res) => {
                console.log(res);
                resolve(message);
            });
        });
    });
};


module.exports = {
    lodashAddMessage,
    addMessage
};
