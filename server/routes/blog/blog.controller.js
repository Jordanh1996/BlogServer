const service = require('./blog.service');


const createBlog = (req, res) => {
    const body = service.lodashBlogPicker(req.body);
    return service.createBlog(body.title,
        body.content,
        body.image,
        req.user)
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

    return service.deleteBlogById(id, req.user.id).then((resblog) => {
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

    return service.patchBlogById(id, req.user.id, body).then((resblog) => {
        if (!resblog) {
            return res.status(404).send();
        }

        res.send({ resblog });
    }).catch(() => {
        res.status(400).send();
    });
};

const getBlogsByUsername = (req, res) => service.getBlogsByUsername(req.user.id)
    .then((resblog) => {
        res.send({ resblog });
    }).catch(() => {
        res.status(400).send();
    });

const get2 = (req, res) => {
    res.send({
        asd: 'asd'
    });
};

module.exports = {
    createBlog,
    get2,
    getBlogs,
    getBlogById,
    getBlogsByUsername,
    deleteBlogById,
    patchBlogById
};
