var request = require("request"),
	hash = require("node_hash");

exports.serviceName = "WebHooks";

exports.author = {
	name: "Anusha Ravindra",
	email: "it@squadcast.com",
	github: "SquadcastHub",
	twitter: "squadcastHQ"
};

exports.onError = function(error, settings, done) {
	request({
		url: settings.url,
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Errorception Notifications"
		},
		method: "post",
		body: JSON.stringify(error),
		timeout: 10000
	}, done);
};
