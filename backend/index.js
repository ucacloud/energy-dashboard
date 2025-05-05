const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  'http://localhost:4200',
  'https://energy-dashboard-nzok.onrender.com',
  'https://energy-dashboard-hgq1ajzuu-ucaclouds-projects.vercel.app',
  'https://energy-dashboard-lemon.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
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
  res.json([
    { id: 1, node: 'LZ_SOUTH', price: 28.45, time: '2025-05-05T10:00:00Z' },
    { id: 2, node: 'LZ_NORTH', price: 30.10, time: '2025-05-05T10:00:00Z' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});