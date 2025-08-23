const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/auth'],
    createProxyMiddleware({
      target: 'https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/api': '/api',
        '^/auth': '/auth',
      },
    })
  );
};


