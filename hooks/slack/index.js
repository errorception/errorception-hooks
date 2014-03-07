var request = require("request");

exports.serviceName = "Slack";

exports.author = {
	name: "Nino D'Aversa",
	email: "nino@ndaversa.com",
	github: "ndaversa",
	twitter: "ndaversa"
};

exports.onError = function(error, settings, done) {
	request({
		url: settings.url,
		method: "post",
		json: {
			attachments: [{
				fallback: error.message,
				pretext: "An error " + (error.isFirstOccurrence ? "occurred" : "recurred") + ". <" + error.webUrl + "|View details" + ">.",
				color: "danger",
				fields: [{
					title: error.message,
					value: (error.isInline ? (" in an inline script on " + error.page) : ("in " + error.scriptPath)),
					short: false
				}]
			}]
		},
		timeout: 10000
	}, done);
};
