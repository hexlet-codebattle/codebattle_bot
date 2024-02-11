import http from 'http';

const server = http.createServer((req, res) => {
  res.end('OK');
});

const port = 3000;

// Start the health check server
server.listen(port, () => {
  console.log(`Health check server listening at http://localhost:${port}/health`);
});
