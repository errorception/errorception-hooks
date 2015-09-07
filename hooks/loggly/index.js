var request = require("request");

exports.serviceName = "Loggly";

exports.author = {
	name: "Tal Bereznitskey",
	email: "berzniz@gmail.com",
	github: "berzniz",
	twitter: "ketacode"
};

exports.onError = function(error, settings, done) {
	// API call docs: http://loggly.com/support/advanced/api-event-submission/

	request({
		url: "https://logs-01.loggly.com/inputs/" + settings.serviceKey + "/tag/errorception",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Errorception Notifications"
		},
		method: "post",
		body: JSON.stringify({
			description: "\"" + error.message + "\" caught by Errorception. See " + error.webUrl + " for details",
			details: error
		}),

		timeout: 10000
	}, done);
};
