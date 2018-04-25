const client = require('../redis/client');

const cleanCache = (key) => {
    return async (req, res, next) => {
        await next();
        if (key) {
            return client.hdel(req.user.username, key)
        }
        client.del(req.user.username);
    };
};

module.exports = cleanCache;
