const fs = require('fs/promises');
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'log_data.json');

// Ensure the JSON file exists on startup
async function init() {
  try {
    await fs.access(dbPath);
  } catch (error) {
    await fs.writeFile(dbPath, JSON.stringify([]));
  }
}

async function readLogs() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from database:', error);
    throw new Error('Could not read from database.');
  }
}

async function writeLog(log) {
  try {
    const logs = await readLogs();
    logs.push(log);
    await fs.writeFile(dbPath, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Error writing to database:', error);
    throw new Error('Could not write to database.');
  }
}

// Initialize the database file
init();

module.exports = {
  readLogs,
  writeLog
};