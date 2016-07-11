var Router = require('express').Router();

Router.use('/', function(req, res) {
	res.render('index');
});

module.exports = Router;