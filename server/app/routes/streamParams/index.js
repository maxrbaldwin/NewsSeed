const Router = require('express').Router();

Router.get('/', function (req, res) {
	res.send('home');
});

Router.get('type/:type', function (req, res) {
	res.send('type');
});

Router.get('id/:id', function (req, res) {
	res.send('id');
});

module.exports = Router;