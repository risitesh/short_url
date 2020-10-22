module.exports = (wagner) => {
    wagner.factory('UrlController', () => {
        const UrlController = require('./url-controller');
        return new UrlController(wagner);
    });
};
