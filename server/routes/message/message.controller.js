const service = require('./message.service');

const addMessage = (req, res) => {
    const body = service.lodashAddMessage(req.body);
    service.addMessage(body.content, req.user, body.blogId).then((message) => {
        res.send({ message });
    }).catch(() => {
        res.status(400).send();
    });
};

const removeMessage = (req, res) => {
    service.removeMessage(req.user.id, req.params.id).then(() => {
        res.send({
            deleted: true
        });
    }).catch(() => {
        res.status(400).send();
    });
};

const updateMessage = (req, res) => {
    const body = service.lodashEditMessage(req.body);
    service.updateMessage(body.content, req.user.id, req.params.id).then(() => {
        res.send({
            updated: true
        });
    }).catch(() => {
        res.status(400).send();
    });
};

const getMessagesByUsername = (req, res) => {
    service.getMessagesByUsername(req.params.username).then((messages) => {
        res.send(messages);
    }).catch(() => {
        res.status(400).send();
    });
};

const getMessagesByBlogId = (req, res) => {
    service.getMessagesByBlogId(req.params.blogid).then((messages) => {
        res.send(messages);
    }).catch(() => {
        res.status(400).send();
    });
};

module.exports = {
    addMessage,
    removeMessage,
    updateMessage,
    getMessagesByUsername,
    getMessagesByBlogId
};
