
const http = require('http');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./utils/errorHandler');
const categoryRoutes = require('./routes/categoryRouter');
const { register } = require('module');
const registerLoginRoute = require('./routes/registerLoginRouter');
const { jwtAuthentication } = require('./middlewares/jwtMiddleware');

const requestListener = (req, res) => {

  if (req.url.startsWith('/products') || req.url.startsWith('/categories')) {
    console.log("came 0");
    jwtAuthentication(req, res, () => {
      if (req.url.startsWith('/products')) {
        console.log("came 1");
        productRoutes(req, res);
      }
     
      else if (req.url.startsWith('/categories')) {
        console.log("come 1a");
        categoryRoutes(req, res);
      }

    })
  }

  else if (req.url.startsWith('/user')) {
    console.log("1");
    registerLoginRoute(req, res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

const server = http.createServer(requestListener);
server.on('error', errorHandler);

module.exports = server;