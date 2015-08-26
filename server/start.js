var chalk = require('chalk');

var app = require('./app');
var startDb = require('./db');
var startStream = require('./stream');

var server = require('http').createServer();

var createApplication = function() {
  server.on('request', app);
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.green('Server started on port', chalk.blue(PORT)));
    });

};

startDb.then(createApplication).then(startServer).then(startStream).catch(function(err){
  console.error(chalk.red(err.stack));
  process.kill(1);
});
