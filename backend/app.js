const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Reemplaza con la URL de tu frontend si es diferente
    methods: ["GET", "POST"]
  }
});
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const autoResponseRoutes = require('./routes/autoResponseRoutes');
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

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
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
      const ticket = await createTicketFromMessage(message);
      io.emit('newTicket', ticket); // Emitir evento de nuevo ticket
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

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
