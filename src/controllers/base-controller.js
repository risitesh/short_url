const EventEmitter = require('events');

class BaseController extends EventEmitter {
    constructor(wagner) {
        super(wagner);
        this.wagner = wagner;
        this.redis = this.wagner.get('Redis');
        this.registerEvents();
    }

    registerEvents() {
        this.on('setRedis', async (key, value) => {
            await this.redis.set(key, value);
        });
    }
}

module.exports = BaseController;
