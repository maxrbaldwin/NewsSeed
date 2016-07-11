var chalk = require('chalk');

var startDb = require('./db');
var app = require('./app');
var sockets = require('./sockets');
var startStream = require('./stream');

var server = require('http').Server();
var io = require('socket.io')(server);

var PORT = process.env.PORT || 5000;

var createApplication = function() {
  server.on('request', app);
};

var startServer = function() {
    server.listen(PORT, function() {
        console.log(chalk.green('Server started on port', chalk.blue(PORT)));
    });
};

var openSockets = function() {
    io.on('connection', sockets);
}

startDb.then(createApplication).then(startServer).then(startStream).catch(function(err){
  console.error(chalk.red(err.stack));
  process.kill(1);
});

// startDb.then(startServer).then(openSockets).catch(function(err) {
//     console.error(chalk.red(err.stack));
//     process.kill(1);
// });
