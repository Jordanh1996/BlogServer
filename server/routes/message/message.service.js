const _ = require('lodash');
const { Message } = require('../../models');


const lodashAddMessage = (body) => _.pick(body, ['blogId', 'content']);

const lodashEditMessage = (body) => _.pick(body, ['content']);

const addMessage = (content, user, blogID) => new Promise((resolve, reject) => {
    Message.build({
        content,
        creatorUsername: user.username,
        createdAt: new Date(),
        edited: false
    }).save().then((message) => {
        message.setBlog(blogID);
        message.setUser(user.id);
        resolve(message);
    });
});

const removeMessage = (userId, messageId) => Message.destroy({
    where: {
        userId,
        id: messageId
    }
});

const updateMessage = (content, userId, messageId) => Message.update(
    {
        content,
        edited: true
    }, {
        where: {
            userId,
            id: messageId
        }
    }
);

const getMessagesByUsername = (username) => Message.findAll({
    where: {
        creatorUsername: username
    }
});

const getMessagesByBlogId = (blogId) => Message.findAll({
    where: {
        blogId
    }
});

module.exports = {
    lodashAddMessage,
    lodashEditMessage,
    addMessage,
    removeMessage,
    updateMessage,
    getMessagesByUsername,
    getMessagesByBlogId
};
