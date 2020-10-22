// require all dependencies from app.js file
const app = require('./app');

const port = process.env.port || 8080;

// listen port
app.set('port', port);
app.listen(port);
