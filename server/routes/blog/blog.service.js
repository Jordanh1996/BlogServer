
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
    return Blog.find({}).skip(end - amount).limit(amount)
}

const getBlogById = (id) => {
    return Blog.findById(id)
}

const getBlogsByUsername = (username) => {
    return Blog.find({
        _creatorUser: username
    })
}

const getBlogsByTitle = (title) => {
    return Blog.find({
        title: {$regex: title}
    })
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

const lodashBlogPicker = (body) => {
    const lodashedbody = _.pick(body, ['title', 'content'])
    return lodashedbody
}

const lodashAmountPicker = (body) => {
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
    getBlogsByUsername,
    getBlogsByTitle,
    deleteBlogById,
    patchBlogById,
    getIdByParams,
    validateById,
    lodashAmountPicker,
    lodashBlogPicker,
    Count
}