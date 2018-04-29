const client = require('../redis/client');

const cleanCache = (key) => async (req, res, next) => {
    await next();
    if (key) {
        return client.hdel(req.user.id, key);
    }
    client.del(req.user.id);
};

const cleanTokenCache = async (req, res, next) => {
    await next();
    client.del(req.user.token);
};

module.exports = {
    cleanCache,
    cleanTokenCache
};
