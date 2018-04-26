const AWS = require('aws-sdk');
const uuid = require('uuid');

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const getSignedUrl = (userId, callback) => {
    const key = `${userId}/${uuid()}.jpeg`
    s3.getSignedUrl(
        "putObject",
        {
            Bucket: 'blog-jordan',
            ContentType: 'image/jpeg',
            Key: key,
            Expires: 60 * 60
        },
        (err, url) => {
            callback(err, url, key)
        }
    );
};

const authorizeToObject = (userId, key) => {
    const objectUserId = key.split('/')[0].toString();
    if (userId.toString() === objectUserId) {
        return {
            authorized: true
        };
    }
    return {
        authorized: false
    };
};

const deleteObject = (key, callback) => {
    s3.deleteObject(
        {
            Bucket: 'blog-jordan',
            Key: key.toString()
        },
        (err, data) => {
            callback(err, data)
        }
    );
};

module.exports = {
    getSignedUrl,
    authorizeToObject,
    deleteObject
};
