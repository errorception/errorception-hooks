Errorception Service Hooks
===

## What is this?

[Errorception](http://errorception.com/) is a service that collects and reports JavaScript errors as they occur in your users' browsers. You might want real-time notifications about such errors as they happen. There could be several ways in which you might prefer to receive these notifications, maybe even using third-party tools and services. This repo houses a collection of such notification integrations – the service hooks.

Want your favorite service on Errorception? Create an issue, or even better, send a pull request. Contributions highly encouraged.

## How does it work?

1. All client-side JS errors that occur are dumped into a [queue](https://github.com/errorception/cumin) to be picked up by the service hooks application running on Errorception's servers.
2. If a project on Errorception has service hooks set up, the configuration settings of those services are passed on to this library, along with the error, so that the service call can be made.
3. The actual implementation of making the service call – the very guts of the service hook application – is handled by this library.

## Anatomy of a service hook

The hooks are ridiculously easy to implement. A typical hook implementation is just one function (`onError`) with very few lines of code (usually just making an HTTP call). For example, the following code is a complete WebHooks implementation:

```javascript
exports.onError = function(error, settings, done) {
	request({
		url: settings.url,
		method: "post",
		body: JSON.stringify(error)
	}, done);
}
```

Check it out – the actual WebHook code in production use at Errorception isn't too different from this.

### The `error` argument

The `error` argument contains information about the error, quite unsurprisingly. A typical error object looks as follows:

```javascript
{
    isInline: true,
    message: "\"_WidgetManager\" is undefined",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.1.2; en-us; GT-I9100G Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    when: "after",
    scriptPath: null,
    page: "http://blog.rakeshpai.me/2007/02/ies-unknown-runtime-error-when-using.html",
    date: "2012-11-12T15:31:02.576Z",
    isFirstOccurrence: true,
    webUrl: "http://errorception.com/projects/4e4b1652f384ef4d2d000002/errors/4ecc86a0fc68e61a1a06fdfc",
    apiUrl: "https://api.errorception.com/projects/4e4b1652f384ef4d2d000002/errors/4ecc86a0fc68e61a1a06fdfc"
}
```

Depending on the service, different fields might be interesting. Probably the most interesting of the lot is the `webUrl` key in the object, since it's a link to the error's details page in Errorception.

### The `settings` argument

The `settings` argument contains configuration settings for the service. These settings are configured at the time of enabling the service in Errorception's settings.

The `settings` object's specific keys and values depends on the service that's being implemented. For example, in the WebHook implementation, a `service.url` key is available for use. The `service.url` is populated by Errorception's settings UI. You would typically use `settings` for things like API keys or security tokens – stuff that's different for each project and that you don't want to share publicly.

Currently, the settings UI (and consecutively the keys in the `settings` object) is managed manually. That is, if you want to integrate a service hook, you'll have to send me a pull request, and I'll make the necessary UI to ensure that the `settings` object has the keys you want. Details below.

The settings object's values are pre-validated so that the hook code can be minimal. The hooks neither need to validate the presence of keys nor the preferred format of their values.

### The `done` argument

`done` is just a function that should be called when the job of making the service hook call is complete. This is the standard node.js style of notifying the caller that the function's task is complete.

## Steps to contribute a service hook

Service hook contributions will be accepted for: 
* Production web applications
* Popular Internet protocols (IRC, Email, Jabber, etc.)
* Self-hosted open-source projects (Jira, Bugzilla, etc.)

If you want a hook for a home-grown internal application that no one else might be interested in, you probably just want to use a [WebHook](http://errorception.com/api/webhook).

__Prerequisites__: You will need to have git installed on your computer (get it [here](http://git-scm.com/downloads)), and will need a GitHub account. You will also need a recent version of node.js (get it [here](http://nodejs.org/)).

1. [Fork this repo](https://help.github.com/articles/fork-a-repo).
2. Create a directory with an approprate name, in `hooks/`, for your hook code.
3. Create an `index.js` file in this `hooks/service-name` directory. Use the following template to get started:
	```javascript
	var request = require("request");

	exports.serviceName = "MyServiceName";	// Replace this with an appropriate value

	exports.author = {
		// Fill in as many fields as you can
		name: "Your name",
		email: "your.email@domain.com",
		github: "yourGithubHandle",
		twitter: "yourTwitterHandle"
	};

	exports.onError = function(error, settings, done) {
		// Your code for the hook implementation goes here
	}
	```
	Your personal details are required so that credit can be given where it's due, and so that there's a way to contact you in case the need arises.
4. Install dependencies by running `npm install` in the root of your clone directory.
5. Avoid installing additional dependencies. The [request](https://github.com/mikeal/request) module is already available as a dependency, so all your HTTP needs are covered. You usually won't need more than this. If you _must_ install a dependency, make sure it's lightweight, minimal, reliable, well tested, and from a trusted source. If you are unsure, get in touch and I'll help you. Install your dependency by using `npm install --save <dependancy-name>`.
6. Create a `README.md` file in `hooks/service-name` with detailed documentation about your service hook. This file is used to render documentation in Errorception's UI when a user is enabling the service hook, so should consist of documentation of the fields that are needed to make the hook work.
7. Send a pull request to this repo.

Once your pull request has been accepted and merged in, I'll manually make the UI for collecting the data you'd want in your copy of the `settings` object. Once that's done, your hook will be live on Errorception. This process will only take a day or two.

## Testing your service hook

You can use the `simulate-hook.js` script from the command-line to simulate a service hook call. The usage is as follows:

```
$ node simulate-hook.js <service-name> '{"json": "settings"}'
```

* `service-name` is the name of the directory you've created in `hooks/`.
* The last argument should be a valid JSON. This object will be passed into `onError` as the `settings` object.
* The error object is picked up automatically from `error-payload.json`.

For example, when I was developing the `webhook` service hook, I was using the following command.

```
$ node simulate-hook.js webhook '{"url": "http://localhost:5555/hook"}'
```

Combine that with `nc -l 5555` on a different shell, and I could see the WebHook's HTTP POST coming to my `settings.url`. Easy peasy!

## License

MIT