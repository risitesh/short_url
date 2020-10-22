module.exports = (wagner) => {
    wagner.factory('UrlManager', () => {
        const UrlManager = require('./url-manager');
        return new UrlManager(wagner);
    });
};
