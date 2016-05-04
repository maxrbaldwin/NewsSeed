var sockets_module = (function() {
    var module = {
        init: function() {
            var $parent = $('.feed');
            var socket = io('http://localhost:5000');

            socket.on('news', function(data) {
                var tweet = '<div class="tweet new">' + data.title + '</div>';
                $parent.append(tweet)
                $(tweet).fadeIn(500);
            });

            socket.on('tweet', function(data) {
                var tweet = '<div class="tweet new">' + data.text + '</div>';
                $parent.append(tweet)
                $(tweet).fadeIn(500);
            });
        },
        
    }

    return module;
})();
