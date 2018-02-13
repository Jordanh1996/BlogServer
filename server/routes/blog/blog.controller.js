
const service = require('./blog.service');


const createBlog = (req, res, next) => {
    const body = service.lodashBodyPicker(req.body)
    return service.createBlog(body.title, 
        body.content, 
        req.user._id, 
        req.user.username)
        .then((resblog) => {
        res.send(resblog)
    }).catch((e) => {
        res.status(400).send()
    })
}

const getBlogs = (req, res, next) => {
    return service.getBlogs()
    .then((resblog) => {
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
}

const getBlogById = (req, res, next) => {
    const id = service.getIdByParams(req)
    if (service.validateById(id)) {
        return res.status(404).send()
    }

    return service.getBlogById(id)
    .then((resblog) => {
        if (!resblog) {
            return res.status(404).send()
        }
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
}

const deleteBlogById = (req, res, next) => {
    const id = service.getIdByParams(req)
    if (service.validateById(id)) {
        return res.status(404).send()
    }

    return service.deleteBlogById(id, req.user._id)
    .then((resblog) => {
        if (!resblog) {
            res.status(404).send()
        }
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
}

const patchBlogById = (req, res, next) => {
    const id = service.getIdByParams(req)
    const body = service.lodashBodyPicker(req.body)
    if (service.validateById(id)) {
        return res.status(404).send()
    }

    return service.patchBlogById(id, req.user._id, body)
    .then((resblog) => {
        if (!resblog) {
            return res.status(404).send()
        }
        
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
}

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    deleteBlogById,
    patchBlogById
}
