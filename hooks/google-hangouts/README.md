### Google Hangouts Chat

Sends message to the configured Google Hangouts Room.

#### Setup

- Provide the WebHook URL available in Room settings.

#### How to get WebHook URL

- Open room to which you want to send messages.
- Click on the room name in top bar and select 'Configure webhooks'.
- Click on 'Add WebHook' and fill name (e.g. Errorception Bot).
- Click on 'Save' and copy 'WebHook URL'.

Details: [Setting up an incoming webhook](https://developers.google.com/hangouts/chat/how-tos/webhooks)

#### Grouping messages in the same thread

- If you want the messages to appear in the same thread instead of creating new threads everytime, you can add `&threadKey=errorception` to end of the Webhook URL.
