module.exports = (wagner, mongoose) => {
    const { Schema } = mongoose;

    const urlSchema = new Schema(
        {
            originalUrl: {
                type: String,
                index: true,
            },
            shortUrl: {
                type: String,
                index: true,
            },
        },
        {
            timestamps: true,
        },
    );
    urlSchema.post('save', async (url) => {
        await wagner.get('Redis').set(url.shortUrl, url.originalUrl);
    });
    return mongoose.model('url', urlSchema);
};
