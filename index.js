var	fs = require("fs"),
	path = require("path"),
	marked = require("marked");

var files = fs.readdirSync(path.join(__dirname, "hooks"));

var hooksDir = path.join(__dirname, "hooks");

files.filter(function(file) {
	return fs.statSync(path.join(hooksDir, file)).isDirectory()
		&& fs.statSync(path.join(hooksDir, file, "index.js")).isFile();
}).forEach(function(hookName) {
	exports[hookName] = require("./hooks/" + hookName + "/index.js");

	if(fs.existsSync(path.join(hooksDir, hookName, "README.md"))) {
		exports[hookName].docs = marked(fs.readFileSync(path.join(hooksDir, hookName, "README.md"), "utf8"));
	} else {
		console.warn("The", hookName, "hook doesn't have any docs!");
	}
});
