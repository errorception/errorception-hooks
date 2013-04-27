var request = require("request"),
	hash = require("node_hash");

exports.serviceName = "WebHooks";

exports.author = {
	name: "Rakesh Pai",
	email: "rakeshpai@errorception.com",
	github: "errorception",
	twitter: "errorception"
};

exports.onError = function(error, settings, done) {
	request({
		url: settings.url,
		headers: {
			"Content-Type": "application/json",
			"X-Signature": hash.sha1(settings.secret + error.message + error.page),
			"User-Agent": "Errorception Notifications"
		},
		method: "post",
		body: JSON.stringify(error),
		timeout: 10000
	}, done);
};
