const venom = require('venom-bot');

venom
  .create()
  .then((client) => start(client))
  .catch((err) => console.log(err));

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Hello from devcomunicationgpt!')
        .then((result) => {
          console.log('Result: ', result); // returns object success
        })
        .catch((error) => {
          console.error('Error when sending: ', error); // return object error
        });
    }
  });
}
