var Router = require('express').Router();

app.use('/seeds', require('./seeds'));
app.use('/stories', require('./stories'));
app.use('/tweets', require('./tweets'));

module.exports = Router;
