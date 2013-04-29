var request = require("request"),
	path = require("path");

exports.serviceName = "PagerDuty";

exports.author = {
	name: "Rakesh Pai",
	email: "rakeshpai@errorception.com",
	github: "errorception",
	twitter: "errorception"
};

exports.onError = function(error, settings, done) {
	// Make an API call as per docs at http://developer.pagerduty.com/documentation/integration/events/trigger

	request({
		url: "https://events.pagerduty.com/generic/2010-04-15/create_event.json",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Errorception Notifications"
		},
		method: "post",
		body: JSON.stringify({
			service_key: settings.serviceKey,
			event_type: "trigger",
			description: "\"" + error.message + "\" caught by Errorception. See " + error.webUrl + " for details",
			incident_key: path.basename(error.webUrl),
			details: error
		}),
		timeout: 10000
	}, done);
};
