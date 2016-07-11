var Router = require('express').Router();

Router.use('/seeds', require('./seeds'));
Router.use('/stream-params', require('./streamParams'));
// app.use('/stories', require('./stories'));
// app.use('/tweets', require('./tweets'));

module.exports = Router;
