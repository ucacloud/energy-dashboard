const request = require('supertest');
const app = require('./index');

describe('Backend API Endpoints', () => {
  describe('GET /api/settlements', () => {
    it('should return 200 OK and an array', async () => {
      const res = await request(app).get('/api/settlements');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return an array of objects with id, name, and amount keys if not empty', async () => {
      const res = await request(app).get('/api/settlements');
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name');
        expect(res.body[0]).toHaveProperty('amount');
      }
    });
  });

  describe('GET /api/prices', () => {
    it('should return 200 OK and an array', async () => {
      const res = await request(app).get('/api/prices');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return an array of objects with id, node, price, and timestamp keys if not empty', async () => {
      const res = await request(app).get('/api/prices');
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('node');
        expect(res.body[0]).toHaveProperty('price');
        expect(res.body[0]).toHaveProperty('timestamp');
      }
    });
  });

  describe('GET /api/lmp', () => {
    it('should return 200 OK and an array', async () => {
      const res = await request(app).get('/api/lmp');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return an array of objects with a node key if not empty', async () => {
      const res = await request(app).get('/api/lmp');
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('node');
      }
    });
  });

  describe('GET /api/lmp-comparison', () => {
    it('should return 200 OK and an array', async () => {
      const res = await request(app).get('/api/lmp-comparison');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return an array of objects with a timestamp key if not empty', async () => {
      const res = await request(app).get('/api/lmp-comparison');
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('timestamp');
      }
    });
  });
});
