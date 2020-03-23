var request = require("request");

exports.serviceName = "Google Hangouts Chat";

exports.author = {
  name: "Md Faizaan",
  email: "aulisius7@gmail.com",
  github: "aulisius",
  twitter: "aulisius_"
};

exports.onError = function(error, settings, done) {
  let message = {
    cards: [
      {
        header: { title: "Errorception Bot", subtitle: "errorception.com" },
        sections: [
          {
            header: "Error Details",
            widgets: [
              { keyValue: { topLabel: "Page", content: error.page } },
              { keyValue: { topLabel: "Message", content: error.message } }
            ]
          },
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: "VIEW ERROR",
                      onClick: { openLink: { url: error.webUrl } }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  request(
    {
      url: settings.url,
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(message),
      timeout: 10000
    },
    done
  );
};
