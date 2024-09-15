const { handleProductCreation, handleProductList, handleProductDetail, handleProductDeletion, handleProductUpdate } = require('../controllers/ProductController');
const { validateProduct } = require('../utils/validatore');
const { jwtAuthentication, authoriRoles } = require('../middlewares/jwtMiddleware');

module.exports = (req, res) => {

  if (req.method === 'POST' && req.url === '/products/create') {
    jwtAuthentication(req, res, () => {
      console.log("came 2");
      authoriRoles(['ADMIN'])(req, res, () => {
        console.log("came 3");
        console.log("prrouter");
        handleProductCreation(req, res);
      });

    });

  } else if (req.method === 'GET' && req.url.match('/products/getAll')) {
    console.log("get");
    jwtAuthentication(req, res, () => {
      handleProductList(req, res);
    });

  } else if (req.method === 'GET' && req.url.match(/^\/products\/get\/\d+$/)) {
    jwtAuthentication(req, res, () => {
      handleProductDetail(req, res);
    });

  } else if (req.method === 'PUT' && req.url.match(/^\/products\/update\/\d+$/)) {
    jwtAuthentication(res, res, () => {
      authoriRoles(['ADMIN'])(req, res, () => {
        handleProductUpdate(req, res);
      });

    });

  } else if (req.method === 'DELETE' && req.url.match(/^\/products\/delete\/\d+$/)) {
    jwtAuthentication(res, res, () => {
      authoriRoles(['ADMIN'])(req, res, () => {
        handleProductDeletion(req, res);
      });

    });

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
}
