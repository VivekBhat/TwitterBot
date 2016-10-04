var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
// var exec = require('child_process').exec;
var fs = require('fs');

var stream = T.stream('user');
stream.on('follow', followed);

function followed(data) {
	var name = data.source.name;
	var screenName = data.source.screen_name;
	tweetIt('#goForIt Mr ' + name + ' @' + screenName);
}

// setInterval(tweetIt, 1000 * 20)
function tweetIt(txt) {
	var filename = 'good1.jpeg';
	var params = {
		encoding : 'base64'
	}

	var b64 = fs.readFileSync(filename, params)

	T.post('media/upload', {
		media_data : b64
	}, uploaded);

	function uploaded(err, data, response) {

		var id = data.media_id_string
		var tweet = {
			// status : '#RandomNumber #no' + r + " let's do some random
			// tweeting "
			status : txt,
			media_ids : [ id ]
		}
		T.post('statuses/update', tweet, tweeted);

	}
	function tweeted(err, data, response) {
		if (err) {
			console.log("Something went wrong my friend.. I think "
					+ err.message);
		} else {
			console.log("It Worked!");
		}

	}

}
