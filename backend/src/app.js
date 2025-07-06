// backend/src/app.js

require("dotenv").config();
const express = require('express');
const cors = require('cors');
const http = require('http'); // 👈 Import http module
const { Server } = require("socket.io"); // 👈 Import Server from socket.io
const logRoutes = require('./api/logs');

const app = express();
const server = http.createServer(app); // 👈 Create an HTTP server from the Express app
const PORT = 3000;

const FE = process.env.FRONTEND_URL;
console.log("FE", FE);

// --- Socket.io Setup ---
// Initialize socket.io and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: FE, // Use the same frontend URL for socket.io's CORS
    methods: ["GET", "POST"]
  }
});

// Middleware to make the io instance available in our routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('Client connected with socket.io:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// --- Your Existing Express Middleware ---
// This CORS setup is maintained as you requested for standard HTTP requests
app.use(cors({
  origin: FE,
  credentials: true
}));

app.use(express.json());


// --- Routes ---
app.use('/logs', logRoutes);

app.get('/', (req, res) => {
  res.send('Log Ingestor API is running.');
});


// --- Start Server ---
// We listen on the 'server' object now, not 'app'.
// This is required for socket.io to work correctly.
server.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});