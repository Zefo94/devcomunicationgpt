const venom = require('venom-bot');

venom
  .create({
    session: 'test-session', // Nombre de la sesión para pruebas
    headless: true, // Puede cambiarse a 'new' o false para ver la ejecución del navegador
  })
  .then((client) => {
    sendTestMessage(client);
  })
  .catch((err) => {
    console.log('Error initializing Venom:', err);
  });

function sendTestMessage(client) {
  const testNumber = '50375860230@c.us'; // Reemplaza con el número de teléfono de prueba en formato internacional
  const testMessage = 'Este es un mensaje de prueba desde Venom Bot';

  client
    .sendText(testNumber, testMessage)
    .then((result) => {
      console.log('Mensaje enviado con éxito:', result);
    })
    .catch((error) => {
      console.error('Error al enviar el mensaje:', error);
    });
}
