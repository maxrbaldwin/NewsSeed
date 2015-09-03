// create app, configurations and api routes
var app = require('express')();
var swig = require('swig');

// Set view render engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Views cache
app.set('view cache', false);
swig.setDefaults({ cache: false });

// Set cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// All data routes will be prefaced with /api
app.use('/api', require('./routes'));

// All get routes that go through the pipeline, past /api, will get the single page layout
app.get('/*', function(req, res){
  res.render('index');
});

/**
* Needs:
* Error Middleware
* Passport
* View cache should only be in production
**/

module.exports = app;
