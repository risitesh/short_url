const express = require('express');
const bodyParser = require('body-parser');
const wagner = require('wagner-core');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const debug = require('debug')('app:*');

const app = express();

// // DB connection Start
mongoose.connect(config.db.url,
    {
        dbName: config.db.name,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(
        () => {
            debug('connected');
        },
    ).catch(
        (err) => {
            debug(err);
        },
    );
mongoose.set('debug', true);
// DB connection end
wagner.factory('mongoose', () => mongoose);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./controllers/index')(wagner);
require('./managers/index')(wagner);
require('./models/index')(wagner);
require('./routes/index')(app, wagner);
require('./utils/cache')(wagner);
require('./utils/helpers')(wagner);

module.exports = app;
