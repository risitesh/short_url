module.exports = (wagner) => {
    wagner.factory('Redis', () => {
        const Redis = require('./redis');
        return new Redis(wagner);
    });
};
