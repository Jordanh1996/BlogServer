var mongoose = require('mongoose');

var Blog = mongoose.model('Blog', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    _creatorUser: {
        type: String,
        required: true,
        minlength: 6
    }
})

module.exports = {Blog};