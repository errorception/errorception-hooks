var request = require("request");

exports.serviceName = "Campfire";

exports.author = {
	name: "Rakesh Pai",
	email: "rakeshpai@errorception.com",
	github: "errorception",
	twitter: "errorception"
};

exports.onError = function(error, settings, done) {
	// Authentication docs: https://github.com/37signals/campfire-api#authentication
	// API call docs: https://github.com/37signals/campfire-api/blob/master/sections/messages.md

	request({
		url: "https://" + settings.subdomain + ".campfirenow.com/room/" + encodeURIComponent(settings.room) + "/speak.json",
		auth: {
			username: settings.token,
			password: "X"
		},
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Errorception Notifications"
		},
		method: "post",
		body: JSON.stringify({message: {
			type: "TextMessage",
			body: "Errorception found an error! \"" + error.message + "\" in "
				+ (error.isInline?("an inline script on " + error.page):error.scriptPath)
				+ ". Details here: " + error.webUrl,
			sound: settings.sound
		}}),
		timeout: 10000
	}, done);
};
