const WebSocket = require('ws'),
    server = new WebSocket.Server({
        port: 12345
    })


server.on('connection',ws => {
    ws.on('message', data => {
        console.log(data);
        server.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
})