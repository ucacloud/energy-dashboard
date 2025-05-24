const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) { // Allow requests with no origin (like mobile apps or curl requests)
      return callback(null, true);
    }
    // Allow localhost and any Vercel app domain
    if (origin === 'http://localhost:4200' || /\.vercel\.app$/.test(new URL(origin).hostname)) {
      return callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Energy Dashboard Backend is running');
});

app.get('/api/settlements', (req, res) => {
  res.json([
    { id: 1, name: 'Market A', amount: 1234.56 },
    { id: 2, name: 'Market B', amount: 7890.12 },
  ]);
});

app.get('/api/prices', (req, res) => {
  const prices = [
    { id: 1, node: 'LZ_SOUTH', price: 28.45, timestamp: '2025-05-05T10:00:00Z' },
    { id: 2, node: 'LZ_NORTH', price: 30.10, timestamp: '2025-05-05T10:00:00Z' }
  ];
  res.json(prices);
});

app.get('/api/lmp', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'lmp-data.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading LMP data:', err);
      return res.status(500).json({ error: 'Failed to load LMP data' });
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/lmp-comparison', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'lmp-comparison.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading LMP Comparison data:', err);
      return res.status(500).json({ error: 'Failed to load LMP comparison data' });
    }
    res.json(JSON.parse(data));
  });
});

// Export the app for testing, then start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;