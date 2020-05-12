const readline = require("readline");
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:12345');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var name, inChat = false;

ws.on('open', function open() {
    rl.question('Enter a name for yourself -> ', input=> {
        name = input;
        console.log('\x1b[35m%s\x1b[0m',`Hello, ${name}. Welcome to the chat!`)
        inChat = !inChat;
        var string = '\x1b[33m' + `${name} has entered the chat.` + '\x1b[1m'
        ws.send(string);
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
    if (inChat) {
        console.log('\x1b[36m%s\x1b[0m', data);
    }
}); 


rl.on("close", function() {
    console.log("\nBye Bye");
    ws.send(`${name} has left the chat.`)
    process.exit(0);
});

