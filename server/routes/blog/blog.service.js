
const { Blog } = require('../../models/blog');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const createBlog = (title, content, _creator, _creatorUser) => {
    return new Blog({
        title,
        content,
        _creator,
        _creatorUser,
        _createdAt: new Date().getTime()
    }).save();
};

const getBlogs = (amount, last, username, title) => {
    const query = {};
    last ? query._id = { $lte: new ObjectID(last) } : null;
    username ? query._creatorUser = { $regex: username } : null;
    title ? query.title = { $regex: new RegExp(title, 'i') } : null;
    return Blog.find(query, null, { 
        skip: last ? 1 : 0,
        limit: amount,
        sort: { _id: -1 }
    });
};

const getBlogById = (id) => {
    return Blog.findById(id);
};

const getBlogsByUsername = (username, amount, last) => {
    if (last) {
        const id = new ObjectID(last);
        return Blog.find({ _id: { $lte: id } }).sort({ _id: -1 }).skip(1).limit(amount);
    }
    return Blog.find({ _creatorUser: username }).sort({ _id: -1 }).limit(amount);
};

const getBlogsByTitle = (title) => {
    return Blog.find({
        title: { $regex: title }
    });
};

const deleteBlogById = (id, userid) => {
    return Blog.findOneAndRemove({
        _id: id,
        _creator: userid
    });
};

const patchBlogById = (id, userid, body) => {
    return Blog.findOneAndUpdate({
        _id: id,
        _creator: userid
        },
        {
            $set: { title: body.title,
                content: body.content,
                editTime: new Date().getTime() 
            }
        },
        {
            $new: true
        }
    );
};

const validateById = (id) => {
    if (!ObjectID.isValid(id)) {
        return true;
    }
};

const getIdByParams = (req) => {
    const id = req.params.id;
    return id;
};

const lodashBlogPicker = (body) => {
    const lodashedBody = _.pick(body, ['title', 'content']);
    return lodashedBody;
};

const lodashGetBlogs = (body) => {
    const lodashedbody = _.pick(body, ['amount', 'last', 'username', 'title']);
    return lodashedbody;
};


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
    lodashGetBlogs,
    lodashBlogPicker
};
