var	fs = require("fs"),
	path = require("path"),
	marked = require("marked");

var files = fs.readdirSync(path.join(__dirname, "hooks"));

files.forEach(function(file) {
	if(path.extname(file) === ".js") {
		var hookName = path.basename(file, ".js");

		exports[hookName] = require("./hooks/" + file);

		if(fs.existsSync(path.join(__dirname, "docs", hookName + ".md"))) {
			exports[hookName].docs = marked(fs.readFileSync(path.join(__dirname, "docs", hookName + ".md"), "utf8"));
		} else {
			console.warn("The", hookName, "hook doesn't have any docs!");
		}
	}
});
