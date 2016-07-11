var Router = require('express').Router();

Router.get('/', function (req, res) {
	res.send('tweets');
});

module.exports = Router;