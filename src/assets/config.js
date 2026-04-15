// This script runs before Angular loads and injects environment variables into the window object
(function() {
  window.BACKEND_URL = process.env['BACKEND_URL'] || 'http://localhost:8083';
})();
