const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const venom = require('venom-bot');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

const port = process.env.PORT || 3000;

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', // Usar la nueva implementación headless de Puppeteer
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Ruta al ejecutable de Chrome
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const browserWSEndpoint = await browser.wsEndpoint();

  venom
    .create({
      session: 'devcomunicationgpt',
      headless: true,
      browserWSEndpoint: browserWSEndpoint,
    })
    .then((client) => start(client))
    .catch((err) => console.log(err));
})();

function start(client) {
  client.onMessage((message) => {
    console.log('Message received:', message);
    if (!message.isGroupMsg) {
      client
        .sendText(message.from, 'Hello from devcomunicationgpt!')
        .then((result) => {
          console.log('Message sent successfully:', result);
        })
        .catch((error) => {
          console.error('Error when sending message:', error);
        });
    } else {
      console.log('Message does not match criteria for response');
    }
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
