const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
  console.log('Connected to WebSocket server');
});

socket.addEventListener('message', (event) => {
  const update = JSON.parse(event.data);

  if (update.type === 'goods_movement') {
    console.log(`Goods Movement Update: ${update.data.action} ${update.data.quantity} units of ${update.data.product} at ${update.data.timestamp}`);

    // Update UI: Append goods movement to the list
    const goodsList = document.getElementById('goodsList');
    const listItem = document.createElement('li');
    listItem.textContent = `${update.data.action.charAt(0).toUpperCase() + update.data.action.slice(1)}: ${update.data.quantity} units of ${update.data.product} at ${update.data.timestamp}`;

    goodsList.appendChild(listItem);
  }
});

socket.addEventListener('close', (event) => {
  console.log('Disconnected from WebSocket server');
});
