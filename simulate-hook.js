var hooks = require("./"),
	path = require("path"),
	fs = require("fs");

var hookName = process.argv[2],
	settings = JSON.parse(process.argv[3]);

var errorPayload = JSON.parse(fs.readFileSync(path.join(__dirname, "error-payload.json"), "utf8"));

hooks[hookName].onError(errorPayload, settings, function(err) {
	if(err) console.error(err);

	process.nextTick(process.exit);
});
