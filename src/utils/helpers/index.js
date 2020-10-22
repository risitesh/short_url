module.exports = (wagner) => {
    wagner.factory('GenerateHelper', () => {
        const GenerateHelper = require('./generate-helper');
        return new GenerateHelper();
    });
};
