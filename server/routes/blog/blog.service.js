
const {Blog} = require('../../models/blog');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const createBlog = (title, content, _creator, _creatorUser) => {
    return new Blog({
        title,
        content,
        _creator,
        _creatorUser,
        _createdAt: new Date().getTime()
    }).save()
}

const getBlogs = (amount, end) => {
    return Blog.find({"index": {$gte: end-amount + 1, $lte: end}})
}

const getBlogById = (id) => {
    return Blog.findById(id)
}

const deleteBlogById = (id, userid) => {
    return Blog.findOneAndRemove({
        _id: id,
        _creator: userid
    })
}

const patchBlogById = (id, userid, body) => {
    return Blog.findOneAndUpdate({
        _id: id,
        _creator: userid
        },
            {
                $set: body
            },
                {
                    $new: true
                }
    )
}

const validateById = (id) => {
    if (!ObjectID.isValid(id)) {
        return true
    }
}

const getIdByParams = (req) => {
    const id = req.params.id
    return id
}

const lodashPostPicker = (body) => {
    const lodashedbody = _.pick(body, ['title', 'content'])
    return lodashedbody
}

const lodashBlogPicker = (body) => {
    const lodashedbody = _.pick(body, ['amount', 'end'])
    return lodashedbody
}

const Count = (end, amount, callback) => {
    if (end) {
        return callback(amount, end)
    }
    Blog.count({}).then((count) => {
        callback(amount, count)
    })
}



module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    deleteBlogById,
    patchBlogById,
    getIdByParams,
    validateById,
    lodashPostPicker,
    lodashBlogPicker,
    Count
}