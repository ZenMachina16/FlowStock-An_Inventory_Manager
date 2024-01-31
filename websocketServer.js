const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

const products = ['Laptops', 'Smartphones', 'Tablets', 'Cameras'];

server.on('connection', (socket) => {
  console.log('Client connected');

  setInterval(() => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomQuantity = Math.floor(Math.random() * 10) + 1;
    const randomAction = Math.random() < 0.5 ? 'shipped' : 'received';

    const movementUpdate = {
      type: 'goods_movement',
      data: {
        action: randomAction,
        product: randomProduct,
        quantity: randomQuantity,
        timestamp: new Date().toISOString(),
      },
    };

    socket.send(JSON.stringify(movementUpdate));
  }, 5000); // Send updates every 5 seconds

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
