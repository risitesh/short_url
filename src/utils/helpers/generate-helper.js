const shortid = require('shortid');

class GenerateHelper {
    generateShortID() {
        return shortid.generate();
    }
}

module.exports = GenerateHelper;
