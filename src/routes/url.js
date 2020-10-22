module.exports = (app, wagner) => {
    const { body, query, validationResult } = require('express-validator');

    app.post('/api/short-url', [
        body('originalUrl', 'originalUrl is not found').exists().notEmpty(),
        body('customEndPoint', 'Custom end point is invalid').optional().notEmpty(),
    ], (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.errors[0].msg });
        }
        next();
        return null;
    }, async (req, res) => {
        try {
            const result = await wagner.get('UrlController').createShortURL(req.body);
            return res.status(result.code).json(result.data);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    });

    app.get('/api/short-url', [
        query('shortUrl', 'shortUrl is not found').exists().notEmpty(),
    ], (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.errors[0].msg });
        }
        next();
        return null;
    }, async (req, res) => {
        try {
            const result = await wagner.get('UrlController').redirectShortURL(req.query.shortUrl);
            if (result.code === 301 || result.code === 302) {
                return res.status(result.code).redirect(result.data.longURL);
            }
            return res.status(result.code).json(result.data);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    });
};
