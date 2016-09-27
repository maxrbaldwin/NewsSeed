// routes for api. home view is in routes/index.js
var Router = require('express').Router();

Router.use('/users', require('./users'));
// Router.use('/search', require('./search'));

module.exports = Router;
