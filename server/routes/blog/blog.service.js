const { Blog, Message } = require('../../models');
const _ = require('lodash');
const { hashCache } = require('../../redis/actions');
const Sequelize = require('sequelize');

const createBlog = (title, content, image = null, user) => new Promise((resolve) => {
    Blog.build({
        title,
        content,
        image,
        creatorUsername: user.username,
        createdAt: new Date(),
        edited: false
    }).save().then((blog) => {
        blog.setUser(user).then((res) => {
            resolve(res.dataValues);
        });
    });
});

const getBlogs = (limit, last, username, title) => {
    const where = {
        title: { [Sequelize.Op.like]: title ? `%${title}%` : '%' },
        creatorUsername: { [Sequelize.Op.like]: username ? `%${username}%` : '%' }
    };
    last ? where.id = { [Sequelize.Op.lt]: last } : null;
    return Blog.findAll({
        limit,
        where,
        order: [['updatedAt', 'DESC']]
    });
};

const getBlogById = (id) => Blog.findById(id);

const getBlogsByUsername = (userId) => {
    const query = () => Blog.findAll({
        where: {
            userId
        },
        order: [['updatedAt', 'DESC']]
    });
    return hashCache(userId, 'blog', query, Blog);
};

const deleteBlogById = (id, userId) => {
    const deleteBlog = Blog.destroy({
        where: {
            id,
            userId
        }
    });
    const deleteMessages = Message.destroy({
        where: {
            blogId: null
        }
    });
    return Promise.all([deleteMessages, deleteBlog]);
};

const patchBlogById = (id, userId, body) => Blog.update(
    {
        title: body.title,
        content: body.content,
        image: body.image,
        edited: true
    }, {
        where: {
            id,
            userId
        }
    }
);

const getIdByParams = (req) => {
    const id = req.params.id;
    return id;
};

const lodashBlogPicker = (body) => {
    const lodashedBody = _.pick(body, ['title', 'content', 'image']);
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
    deleteBlogById,
    patchBlogById,
    getIdByParams,
    lodashGetBlogs,
    lodashBlogPicker
};
