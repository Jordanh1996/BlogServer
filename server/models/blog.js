const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
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
    image: {
        type: String
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    _creatorUser: {
        type: String,
        required: true,
        minlength: 6
    },
    _createdAt: {
        type: Number,
        required: true,
    },
    editTime: {
        type: Number
    }
});


const Blog = mongoose.model('Blog', BlogSchema);


module.exports = { Blog };
