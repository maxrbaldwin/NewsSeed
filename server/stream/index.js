// var Twitter = require('twitter');
// var env = require('dotenv').config();

// var newsFilter = require('./filters/news');
// var streamError = require('./error');
// var streamIDs = require('./ids');

// var client = new Twitter({
//     consumer_key: env.consumer_key,
//     consumer_secret: env.consumer_secret,
//     access_token_key: env.access_token_key,
//     access_token_secret: env.access_token_secret
// });


// streamIDs.initStream('twitterId', function(ids) {
//     var newsStreamParameters = {
//         follow: ids
//     };

//     client.stream('statuses/sample', newsStreamParameters, function(stream) {
//         // stream.on('data', newsFilter);
//         // stream.on('error', streamError);
//         console.log(stream)
//     });
// });

var request = require('request');
var options = {
    url: 'https://stream.twitter.com/1.1/statuses/sample.json',
    headers: {
        Authorization: 'OAuth oauth_consumer_key="Fob2x1FPeA92fRxpC6Dbz8qP2", oauth_nonce="4c15d717a91990392bc9d6eed8adad16", oauth_signature="U2uzvVy8YDlRA25kL77Wcdugr9A%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1469216356", oauth_token="190360439-qYKbVnX3Mz9Mc3a1iOHT1KWZO1k4Sj2rs60p0GUe", oauth_version="1.0"'
    }
}

var r = request(options);

r.on('response', function(res) {
    var body = []
    
    res.on('data', function(buffer) {
        
        console.log(buffer.toString())
    });

    res.on('end', function () {
        console.log('end')
    });
});


// var data = ''
//     response.on('data', function(chunk) {
//         data += chunk
//     })

//     response.on('end', function() {
//         console.log(data.toString())
//     })
