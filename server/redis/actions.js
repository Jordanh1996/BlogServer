const client = require('./client');

const cache = (key, query, model) => new Promise((resolve, reject) => {
    client.get(key).then((res) => {
        if (res) {
            return resolve(model.build(JSON.parse(res)));
        }
        query().then((res) => {
            client.set(key, JSON.stringify(res));
            return resolve(res);
        });
    });
});

const hashCache = (key1, key2, query, model) => new Promise((resolve, reject) => {
    client.hget(key1, key2).then((res) => {
        if (res) {
            return resolve(model.build(JSON.parse(res)));
        }
        query().then((res) => {
            client.hset(key1, key2, JSON.stringify(res));
            return resolve(res);
        });
    });
});

module.exports = {
    cache,
    hashCache
};
