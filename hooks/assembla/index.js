var request = require("request");

exports.serviceName = "Assembla";

exports.author = {
	name: "Marius Matei",
	email: "nongeekboy@gmail.com",
	github: "sica07",
	twitter: "nongeekboy"
};

exports.onError = function(error, settings, done) {
	request({
		url: "https://api.assembla.com/v1/spaces/" + settings.workspace +  "/tickets.json",
		headers: {
			"X-Api-Key": settings.key,
			"X-Api-Secret": settings.secret,
			"Content-Type": "application/json",
			"User-Agent": "Errorception Notifications"
		},
		method: "post",
		body: JSON.stringify({
			ticket: {
				summary: "JS Error:" + error.message,
				description: "Errorception found an error! \"" + error.message + "\" in "
					+ (error.isInline?("an inline script on " + error.page):error.scriptPath)
					+ ". Details here: " + error.webUrl,
				pritority: settings.priority
			}
		}),
		timeout: 10000
	}, done);
}
