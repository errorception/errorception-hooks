var request = require("request");

exports.serviceName = "Flowdock";

exports.author = {
	name: "Joel Moss",
	email: "joel@developwithstyle.com",
	github: "joelmoss",
	twitter: "joelmoss"
};

exports.onError = function(error, settings, done) {
	request({
		url: "https://api.flowdock.com/v1/messages/team_inbox/" + settings.apiToken,
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Errorception Notifications"
		},
		method: "post",
		body: JSON.stringify({
			source: "Errorception",
			from_address: "help@errorception.com",
			subject: "Errorception found an error!",
			content: "Errorception found an error! \"" + error.message + "\" in "
				+ (error.isInline?("an inline script on " + error.page):error.scriptPath)
				+ ". Details here: " + error.webUrl,
			link: error.webUrl
		}),
		timeout: 10000
	}, done);
};
