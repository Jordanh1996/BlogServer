const redis = require('redis');
const util = require('util');

const client = redis.createClient(process.env.REDIS_URL);
client.set = util.promisify(client.set);
client.hset = util.promisify(client.hset);
client.get = util.promisify(client.get);
client.hget = util.promisify(client.hget);

module.exports = client;
