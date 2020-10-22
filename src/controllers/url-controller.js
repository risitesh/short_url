const BaseController = require('./base-controller');

class UrlController extends BaseController {
    constructor(wagner) {
        super(wagner);
        this.urlManager = this.wagner.get('UrlManager');
        this.generateHelper = this.wagner.get('GenerateHelper');
    }

    async createShortURL(payload) {
        try {
            const existingURL = await this.urlManager.getOriginalUrl(payload.originalUrl);
            if (!existingURL) {
                const shortURLPath = await this.validateShortURL();
                this.urlManager.createShortUrl(
                    {
                        originalUrl: payload.originalUrl,
                        shortUrl: shortURLPath,
                    },
                );
                return { code: 201, data: { shortURL: shortURLPath } };
            }
            return { code: 200, data: { shortURL: existingURL.shortUrl } };
        } catch (error) {
            error.status = error.status || 400;
            return { code: error.status, data: { message: error.message } };
        }
    }

    async validateShortURL() {
        try {
            const shortURLPath = this.generateHelper.generateShortID();
            const existingShortUrl = await this.urlManager.getShortUrl(shortURLPath);
            if (existingShortUrl) {
                await this.validateShortURL();
            }
            return shortURLPath;
        } catch (error) {
            throw new Error(error);
        }
    }

    async redirectShortURL(shortURL) {
        try {
            const urlExistInCache = await this.redis.get(shortURL);
            if (!urlExistInCache) {
                const existingURL = await this.urlManager.getShortUrl(shortURL);
                if (existingURL) {
                    this.emit('setRedis', shortURL, existingURL.originalUrl);
                    return { code: 301, data: { longURL: existingURL.originalUrl } };
                }
                throw new Error('URL not found');
            }
            return { code: 301, data: { longURL: urlExistInCache } };
        } catch (error) {
            error.status = error.status || 400;
            return { code: error.status, data: { message: error.message } };
        }
    }
}

module.exports = UrlController;
