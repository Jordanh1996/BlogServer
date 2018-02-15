var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
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
    },
    _createdAt: {
        type: Number,
        required: true,
    },
    index: {
        type: Number
    }
})

BlogSchema.pre('save', function(next) {
    Blog.count({}, (err, count) => {
        this.index = count + 1 || 1
        next()
    })
})

var Blog = mongoose.model('Blog', BlogSchema)



module.exports = {Blog};