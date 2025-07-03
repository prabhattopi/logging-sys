require("dotenv").config();
const express = require('express');
const cors = require('cors');
const logRoutes = require('./api/logs');

const app = express();
const PORT = 3000;

// This one line is enough to handle CORS and preflight requests
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use('/logs', logRoutes);

app.get('/', (req, res) => {
  res.send('Log Ingestor API is running.');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});