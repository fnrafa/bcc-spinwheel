const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let spinState = {
    spinning: false,
    selectedItem: null,
    rotation: 0,
};

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.send(JSON.stringify({ type: "init", spinState }));

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "startSpin") {
            spinState.spinning = true;
            spinState.rotation = data.rotation;
            broadcast({ type: "startSpin", rotation: data.rotation });
        }
    });

    ws.on("close", () => console.log("Client disconnected"));
});

function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

console.log("WebSocket server running on ws://localhost:8080");
