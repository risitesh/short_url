class UrlManager {
    constructor(wagner) {
        this.wagner = wagner;
        this.url = this.wagner.get('Url');
    }

    async createShortUrl(payload) {
        try {
            const result = await this.url.create(payload);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOriginalUrl(originalUrl) {
        try {
            const result = await this.url.findOne({ originalUrl });
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getShortUrl(shortUrl) {
        try {
            const result = await this.url.findOne({ shortUrl });
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UrlManager;
