module.exports = (app, wagner) => {
    require('./url')(app, wagner);
    app.get('/health', (req, res) => res.sendStatus(200));
};
