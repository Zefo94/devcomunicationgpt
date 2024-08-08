const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const autoResponseRoutes = require('./routes/autoResponseRoutes'); // Nueva ruta
const venom = require('venom-bot');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const axios = require('axios');
const { createTicketFromMessage } = require('./controllers/ticketController');
const { AutoResponse } = require('./models');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/autoresponse', autoResponseRoutes);

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

async function start(client) {
  client.onMessage(async (message) => {
    console.log('Message received:', message);
    if (!message.isGroupMsg) {
      await createTicketFromMessage(message);
      const autoResponse = await AutoResponse.findOne();
      if (autoResponse) {
        client.sendText(message.from, autoResponse.message)
          .then((result) => {
            console.log('Auto response sent successfully:', result);
          })
          .catch((error) => {
            console.error('Error when sending auto response:', error);
          });
      }
    } else {
      console.log('Message does not match criteria for response');
    }
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
