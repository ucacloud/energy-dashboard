const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const allowedOrigins = [
  'http://localhost:4200',
  'https://energy-dashboard-nzok.onrender.com',
  'https://energy-dashboard-hgq1ajzuu-ucaclouds-projects.vercel.app',
  'https://energy-dashboard-lemon.vercel.app',
  'https://energy-dashboard-r9eo0put7-ucaclouds-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    let isVercelDomain = false;
    try {
      isVercelDomain = /\.vercel\.app$/.test(new URL(origin).hostname);
    } catch {
      return callback(new Error('Invalid origin'));
    }

    if (allowedOrigins.includes(origin) || isVercelDomain) {
      return callback(null, true);
    } else {
      console.warn(`CORS blocked: ${origin}`);
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

app.post('/api/compliance-check', (req, res) => {
  const logContent = req.body.logContent || '';
  const pythonProcess = spawn('python', [
    path.join(__dirname, 'python', 'compliance_checker.py'),
    '--from-api'
  ]);

  let result = '';
  let errorOutput = '';

  pythonProcess.stdin.write(logContent);
  pythonProcess.stdin.end();

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Python errpr:', errorOutput);
      return res.status(500).json({ error: 'Python script failed', details: errorOutput });
    }
    try {
      const parsed = JSON.parse(result);
      res.json(parsed);
    } catch (err) {
      console.error('Failed to parse Python output:', err);
      res.status(500).json({ error: 'Invaid output from script' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});