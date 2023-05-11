const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // The URL path to your Flask server
    createProxyMiddleware({
      target: 'https://plantitweb.onrender.com', // The URL of your Flask server
      changeOrigin: true,
      secure: false,
      headers: {
        Connection: 'keep-alive',
      },
      // pathRewrite: {
      //   '^/api': '', // Remove the '/api' path from the request
      // },
      // Additional options if required
    })
  );
};