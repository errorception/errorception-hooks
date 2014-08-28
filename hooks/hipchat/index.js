var request = require("request");

exports.serviceName = "HipChat";

exports.author = {
	name: "Rakesh Pai",
	email: "rakeshpai@errorception.com",
	github: "errorception",
	twitter: "errorception"
};

function formatMessage(error) {
	var message = "An error " + (error.isFirstOccurrence?"occurred":"recurred") + "!<br />";
	message += "<b>" + error.message + "</b> ";
	if(error.isInline) {
		message += "in an inline script on " + error.page;
	} else {
		message += "in " + error.scriptPath;
	}

	message += " <a href='" + error.webUrl + "'>View details &raquo;</a>";

	return message;
}

exports.onError = function(error, settings, done) {
	// Make an API call as documented at https://www.hipchat.com/docs/api/method/rooms/message
	request({
		url: (settings.fqdn || "https://api.hipchat.com") + "/v1/rooms/message",  // fqdn is for self-hosted HipChat Servers
		qs: {
			auth_token: settings.token
		},
		method: "post",
		form: {
			room_id: settings.room,
			from: "Errorception",
			message_format: "html",
			message: formatMessage(error),
			notify: settings.notify,
			color: settings.color
		},
		headers: {
			"User-Agent": "Errorception Notifications"
		},
		timeout: 10000
	}, done);
};
