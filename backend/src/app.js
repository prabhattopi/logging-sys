const express = require('express');
const cors = require('cors');
const logRoutes = require('./api/logs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({origin:"*"}));
app.use(express.json());

// Routes
app.use('/logs', logRoutes);

app.get('/', (req, res) => {
  res.send('Log Ingestor API is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});