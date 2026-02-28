// test/counter.test.js
// Automated tests for the tally counter REST API using Mocha and assert.

const assert = require('assert');
const http = require('http');
const { app } = require('../src/main');

// Helper to make GET requests and return parsed JSON
function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3001${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: JSON.parse(data)
        });
      });
    }).on('error', reject);
  });
}

describe('Tally Counter API', () => {
  let server;

  // Start a test server on port 3001 before all tests
  before((done) => {
    server = app.listen(3001, done);
  });

  // Close the test server after all tests
  after((done) => {
    server.close(done);
  });

  // Reset the counter before each test so tests are independent
  beforeEach(async () => {
    await get('/counter-reset');
  });

  // Tests for GET /counter-read
  describe('GET /counter-read', () => {
    it('should return 200 status', async () => {
      const res = await get('/counter-read');
      assert.strictEqual(res.status, 200);
    });

    // Verify that the count is a number and starts at 0
    it('should return count as a number', async () => {
      const res = await get('/counter-read');
      assert.strictEqual(typeof res.body.count, 'number');
    });

    // Verify that the count starts at 0 after reset
    it('should return 0 after reset', async () => {
      const res = await get('/counter-read');
      assert.strictEqual(res.body.count, 0);
    });
  });

  // Tests for GET /counter-increase
  describe('GET /counter-increase', () => {
    it('should return 200 status', async () => {
      const res = await get('/counter-increase');
      assert.strictEqual(res.status, 200);
    });

    // Verify that the count increases by 1 on the first call
    it('should return 1 after first increase', async () => {
      const res = await get('/counter-increase');
      assert.strictEqual(res.body.count, 1);
    });

    // Verify that the count increases by 1 on each subsequent call
    it('should increment count by 1 on each call', async () => {
      await get('/counter-increase');
      await get('/counter-increase');
      const res = await get('/counter-increase');
      assert.strictEqual(res.body.count, 3);
    });

    // Verify that the increased count is reflected in counter-read
    it('should be reflected in counter-read after increase', async () => {
      await get('/counter-increase');
      await get('/counter-increase');
      const res = await get('/counter-read');
      assert.strictEqual(res.body.count, 2);
    });
  });

  // Tests for GET /counter-reset
  describe('GET /counter-reset', () => {
    it('should return 200 status', async () => {
      const res = await get('/counter-reset');
      assert.strictEqual(res.status, 200);
    });

    // Verify that the count resets to 0 after calling counter-reset
    it('should return 0 after reset', async () => {
      await get('/counter-increase');
      await get('/counter-increase');
      const res = await get('/counter-reset');
      assert.strictEqual(res.body.count, 0);
    });

    // Verify that the reset count is reflected in counter-read
    it('should reset count to 0 verified by counter-read', async () => {
      await get('/counter-increase');
      await get('/counter-increase');
      await get('/counter-reset');
      const res = await get('/counter-read');
      assert.strictEqual(res.body.count, 0);
    });
  });
});