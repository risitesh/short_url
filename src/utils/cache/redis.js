const redis = require('redis');
const redisConfig = require('config').redis;
const { promisify } = require('util');

class Redis {
    constructor(wagner) {
        this.wagner = wagner;
        this.redis = redis.createClient({ port: redisConfig.port, host: redisConfig.host });
        this.setAsync = promisify(this.redis.set).bind(this.redis);
        this.getAsync = promisify(this.redis.get).bind(this.redis);
        this.expireAsync = promisify(this.redis.expire).bind(this.redis);
    }

    async set(key, value) {
        try {
            const result = await this.setAsync(key, value);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async expire(key, timeInSeconds) {
        try {
            await this.expireAsync(key, timeInSeconds);
        } catch (error) {
            throw new Error(error);
        }
    }

    async get(key) {
        try {
            const result = await this.getAsync(key);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    delete(key) {
        this.redis.DEL(key);
    }
}

module.exports = Redis;
