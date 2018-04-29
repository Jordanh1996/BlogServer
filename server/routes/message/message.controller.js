const service = require('./message.service');

const addMessage = (req, res) => {
    const body = service.lodashAddMessage(req.body);
    service.addMessage(body.content, body.blogID, req.user._id, req.user.username).then((resMessage) => {
        res.send({resMessage});
    }).catch(() => {
        res.status(400).send();
    });
};

module.exports = {
    addMessage
};
