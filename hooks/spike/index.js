var request = require("request"),
    path = require("path");

exports.serviceName = "Spike";

exports.author = {
    name: "Kaushik Thirthappa",
    email: "kaushik@spike.sh",
    github: "ktkaushik",
    twitter: "ktkaushik"
};

exports.onError = function(error, settings, done) {

    request({
        url: settings.url,
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Spike Notification"
        },
        method: "post",
        body: JSON.stringify({
            details: error
        }),
        timeout: 10000
    }, done);
};