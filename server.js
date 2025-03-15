const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === "SPIN_START" && data.finalId !== undefined) {
                console.log(`Spin Start Event Received for item ID: ${data.finalId}`);
                broadcast({ type: "SPIN_START", finalId: data.finalId });
            }
        } catch (err) {
            console.error("Error parsing message:", err);
        }
    });
    ws.on("close", () => console.log("Client disconnected"));
    ws.on("error", (err) => console.warn("WebSocket error:", err.message));
});

function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
            console.log(`Sent message to client: ${JSON.stringify(data)}`);
        }
    });
}
