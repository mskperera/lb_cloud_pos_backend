const io = require("socket.io-client");

// Replace with your server's URL and port
const socket = io(process.env.SOCKET_IO_URL);

// Log connection status
socket.on("connect", () => {
  console.log("Connected to the server!");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server.");
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});

// Function to send `sendPrint` event and wait for the response
function sendPrint(printDeskId, printerName,receiptSize, receiptData) {
  return new Promise((resolve, reject) => {
    if (socket.connected) {
      // Emit the sendPrint event
      socket.emit("sendPrint", { printDeskId, printerName,receiptSize, receiptData });
    //  console.log(`Message sent to 'sendPrint': ${printDeskId}, ${printer}, ${payload}`);

      // Listen for the 'printRespond' event once
      socket.once("printRespond", (data) => {
        console.log("Received 'printRespond' event from server:", data);
        resolve(data);
      });

      // Optional: Add a timeout to handle no response
      setTimeout(() => reject(new Error("Timeout: No response received from server")), 5000);
    } else {
      reject(new Error("Socket is not connected. Cannot send 'sendPrint' message."));
    }
  });
}

module.exports = { sendPrint };
