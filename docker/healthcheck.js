const http = require('http');

const options = {
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
  path: '/',
  timeout: 2000
};

const request = http.request(options, (res) => {
  console.log(`HEALTH CHECK: Status ${res.statusCode}`);
  process.exit(res.statusCode === 200 ? 0 : 1);
});

request.on('error', function(err) {
  console.log('HEALTH CHECK FAILED:', err);
  process.exit(1);
});

request.end();
