// routes for api. home view is in routes/index.js
var Router = require('express').Router();

Router.use('/users', require('./users'));

module.exports = Router;
