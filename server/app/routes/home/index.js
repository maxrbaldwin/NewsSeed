var Router = require('express').Router();

Router.use('/', function(req, res) {
	if(req.session) {
		res.render('index');
	} else {
		res.render('home');
	}
});

module.exports = Router;