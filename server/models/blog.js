const Sequelize = require('sequelize');
const sequelize = require('../db/mysql');

const Blog = sequelize.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    creatorUsername: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 32],
                msg: 'String length is not in this range'
            }
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    edited: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Blog;
