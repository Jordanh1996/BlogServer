const service = require('./upload.service');

const getSignedUrl = (req, res) => {
    service.getSignedUrl(req.user.id, (err, url, key) => {
        if (err) {
            return res.status(400).send();
        }
        res.send({ url, key });
    });
};

const deleteObject = (req, res) => {
    if (!service.authorizeToObject(req.user.id, req.body.image).authorized) {
        return res.status(403).send();
    }
    service.deleteObject(req.body.image, (err, data) => {
        if (err) {
            return res.status(400).send();
        }
        res.send({ data });
    });
};

module.exports = {
    getSignedUrl,
    deleteObject
};
