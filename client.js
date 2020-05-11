const readline = require("readline");
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:12345');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

ws.on('open', function open() {
    rl.question('Enter a name for yourself -> ', name=> {
        console.log(`Hello, ${name}. Welcome to the chat!!!`)
        var recursePrompt = function() {
            rl.question(``, (message) => {
                ws.send(`${name}: ${message}`)
                if (message === "exit") return rl.close();
                recursePrompt();
            });
        }
        recursePrompt();
    });
})

ws.on('message', function incoming(data) {
    console.log(data);
})


rl.on("close", function() {
    console.log("\nBye Bye");
    process.exit(0);
});

