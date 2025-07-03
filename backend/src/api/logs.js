const express = require('express');
const { readLogs, writeLog } = require('../services/db');
const router = express.Router();

const validateLog = (req, res, next) => {
  const { level, message, resourceId, timestamp, traceId, spanId, commit, metadata } = req.body;
  if (!level || !message || !resourceId || !timestamp || !traceId || !spanId || !commit || !metadata) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  next();
};

// Ensure the path is just '/'
router.post('/', validateLog, async (req, res) => {
  try {
    const newLog = req.body;
    await writeLog(newLog);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ensure the path is just '/'
router.get('/', async (req, res) => {
  try {
    let logs = await readLogs();
    const filters = req.query;
    const filteredLogs = logs.filter(log => {
      let isValid = true;
      for (const key in filters) {
        if (filters[key]) {
          if (key === 'timestamp_start') {
            isValid = isValid && new Date(log.timestamp) >= new Date(filters[key]);
          } else if (key === 'timestamp_end') {
            isValid = isValid && new Date(log.timestamp) <= new Date(filters[key]);
          } else if (key === 'message') {
            isValid = isValid && log.message.toLowerCase().includes(filters[key].toLowerCase());
          } else {
            isValid = isValid && log[key] && log[key].toString() === filters[key];
          }
        }
      }
      return isValid;
    });

    const sortedLogs = filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.status(200).json(sortedLogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;