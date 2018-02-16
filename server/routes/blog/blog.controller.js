
const service = require('./blog.service');


const createBlog = (req, res, next) => {
    const body = service.lodashBlogPicker(req.body)
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
    // const body = service.lodashBlogPicker(req.body)
    // if (body.end) {
    //     return service.getBlogs(body.amount, body.end)
    //     .then((resblog) => {
    //         res.send({resblog})
    //     }).catch((e) => {
    //         res.status(400).send()
    //     }) 
    // }
    // service.CountBlogs().then((count) => {
    //     return service.getBlogs(body.amount, count)
    //     .then((resblog) => {
    //         res.send({resblog})
    //     }).catch((e) => {
    //         res.status(400).send()
    //     })
    // })
    // const body = service.lodashBlogPicker(req.body)
    // const Blogs = (res, amount, end) => {
    //     return service.getBlogs(res, amount, end)
    //     .then((resblog) => {
    //         res.send({resblog})
    //     }).catch((e) => {
    //         res.status(400).send()
    //     })
    // }
    // if (body.end) {
    //     return Blogs(res, body.amount, body.end)
    // }
    // serivce.CountBlogs().then((count) => {
    //     Blogs(res, body.amount, count)
    // })
    const body = service.lodashAmountPicker(req.body)
    service.Count(body.end, body.amount, (amount, end) => {
            return service.getBlogs(amount, end)
        .then((resblog) => {
            res.send({resblog})
        }).catch((e) => {
            res.status(400).send()
        }) 
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

const getBlogsByUsername = (req, res, next) => {
    const username = service.getIdByParams(req);
    service.getBlogsByUsername(username).then((resblog) => {
        res.send({resblog})
    }).catch((e) => {
        res.status(400).send()
    })
}

const getBlogsByTitle = (req, res, next) => {
    const title = service.getIdByParams(req)
    service.getBlogsByTitle(title).then((resblog) => {
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
    const body = service.lodashBlogPicker(req.body)
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
    getBlogsByUsername,
    getBlogsByTitle,
    deleteBlogById,
    patchBlogById
}
