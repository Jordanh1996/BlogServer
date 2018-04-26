const service = require('./blog.service');


const createBlog = (req, res) => {
    const body = service.lodashBlogPicker(req.body);
    return service.createBlog(body.title,
        body.content,
        body.image,
        req.user._id,
        req.user.username)
        .then((resblog) => {
            res.send(resblog);
        }).catch(() => {
            res.status(400).send();
    });
};

const getBlogs = (req, res) => {
    const body = service.lodashGetBlogs(req.body);
    return service.getBlogs(body.amount, body.last, body.username, body.title).then((resblog) => {
        res.send({ resblog });
    }).catch(() => {
        res.status(400).send();
    });
};

const getBlogById = (req, res) => {
    const id = service.getIdByParams(req);
    if (service.validateById(id)) {
        return res.status(404).send();
    }

    return service.getBlogById(id).then((resblog) => {
        if (!resblog) {
            return res.status(404).send();
        }
        res.send({ resblog });
    }).catch(() => {
        res.status(400).send();
    });
};

const deleteBlogById = (req, res) => {
    const id = service.getIdByParams(req);
    if (service.validateById(id)) {
        return res.status(404).send();
    }

    return service.deleteBlogById(id, req.user._id).then((resblog) => {
        if (!resblog) {
            res.status(404).send();
        }
        res.send({ resblog });
    }).catch(() => {
        res.status(400).send();
    });
};

const patchBlogById = (req, res) => {
    const id = service.getIdByParams(req);
    const body = service.lodashBlogPicker(req.body);
    if (service.validateById(id)) {
        return res.status(404).send();
    }

    return service.patchBlogById(id, req.user._id, body).then((resblog) => {
        if (!resblog) {
            return res.status(404).send();
        }

        res.send({ resblog });
    }).catch(() => {
        res.status(400).send();
    });
};

const getBlogsByUsername = (req, res) => {
    const username = service.getIdByParams(req);
    return service.getBlogsByUsername(username)
    .then((resblog) => {
        res.send({ resblog });
    }).catch(() => {
        res.status(400).send();
    });
};

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    getBlogsByUsername,
    deleteBlogById,
    patchBlogById
};
