const Sequelize = require('sequelize');
const sequelize = require('../db/mysql');

const Message = sequelize.define('message', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
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

module.exports = Message;
