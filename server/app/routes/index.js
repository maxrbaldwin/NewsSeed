var Router = require('express').Router();

Router.use('/seeds', require('./seeds'));
// Router.use('/stories', require('./stories'));
// Router.use('/tweets', require('./tweets'));

module.exports = Router;
