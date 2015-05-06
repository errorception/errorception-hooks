var request = require("request"),
	path = require("path");

exports.serviceName = "AlertOps";

exports.author = {
    name: "Xinlin Ruan",
    email: "xinlinr@alertops.com",
    github: "AlertOps",
    twitter: "AlertOps"
};

exports.onError = function(error, settings, done) {
    request({
		url: "https://notify.alertops.com/restapi.svc/POSTAlertV2/generic/" 
			+ settings.apiKey + "/Errorception/" + settings.sourceName 
			+ "/subject/id/none/none/webUrl/shortText/LongText",
		method: "post",
		body: JSON.stringify({
			subject: "(Errorception) " + error.message,
			id: path.basename(error.webUrl),
			webUrl: error.webUrl,
			shortText: "Error: " + error.message,
			LongText: "An Error " + error.message + (error.isFirstOccurrence ? " occurred" : " recurred") 
						+ " at time: " + error.date
						+ " in " + (error.isInline?("an inline script on " + error.page):error.scriptPath)
						+ " See " + error.webUrl + " for details"
		}),
		timeout: 10000
	}, done);
}
