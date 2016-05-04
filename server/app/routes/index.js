var Router = require('express').Router();

Router.use('/seeds', require('./seeds'));
// app.use('/stories', require('./stories'));
// app.use('/tweets', require('./tweets'));

module.exports = Router;
