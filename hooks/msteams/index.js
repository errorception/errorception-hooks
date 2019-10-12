var request = require("request");

exports.serviceName = "Microsoft Teams";

exports.author = {
	name: "Anders Jacobsson",
	email: "anders.jacobsson@gmail.com",
	github: "bloomper"
};

exports.onError = function(error, settings, done) {
	request({
		url: settings.url,
		method: "post",
		json: {
			"@type": "MessageCard",
			"@extensions": "https://schema.org/extensions",
			"summary": "Errorception",
			"themeColor": "",
			"title": "An error " + (error.isFirstOccurrence ? "occurred" : "recurred") + ".",
			"sections": [
				{
					"title": error.message,
					"text": (error.isInline ? (" in an inline script on " + error.page) : ("in " + error.scriptPath)),
					"potentialAction": [
						{
							"@type": "OpenUri",
							"name": "View details",
							"targets": [
								{
									"os": "default",
									"uri": error.webUrl
								}
							]
						}
					]
				}
			]
		},
		timeout: 10000
	}, done);
};
