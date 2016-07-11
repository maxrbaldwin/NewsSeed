var emitter = require('events').eventEmitter;

var connection = function(socket) {
    emitter.on('news', function(doc){
    	socket.emit('news', doc);
    });

    emitter.on('tweet', function(doc){
    	socket.emit('tweet', doc);
    });
}

module.exports = connection;
