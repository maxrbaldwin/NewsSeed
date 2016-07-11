var Router = require('express').Router();

Router.use('/tweets', require('./tweets'));

module.exports = Router;
