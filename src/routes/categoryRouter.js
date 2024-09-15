const { handleCategoryCreation, handleCategoryList, handleCategoryDetail, handleCategoryUpdate, handleCategoryDeletion } = require('../controllers/categoryController');
const { validateProduct } = require('../utils/validatore');
const { jwtAuthentication, authoriRoles } = require('../middlewares/jwtMiddleware');
module.exports = (req, res) => {
    if (req.method === 'POST' && req.url === '/categories/create') {
        jwtAuthentication(req, res, () => {
            console.log("came 2");
            authoriRoles(['ADMIN'])(req, res, () => {
                console.log("came 3");
                console.log("prrouter");
                handleCategoryCreation(req, res);
            });

        });

    } else if (req.method === 'GET' && req.url === '/categories/getAll') {
        jwtAuthentication(req, res, () => {
            handleCategoryList(req, res);
        });

    } else if (req.method === 'GET' && req.url.match(/^\/categories\/get\/\d+$/)) {
        jwtAuthentication(req, res, () => {
            handleCategoryDetail(req, res);
        });

    } else if (req.method === 'PUT' && req.url.match(/^\/categories\/update\/\d+$/)) {
        jwtAuthentication(req, res, () => {
            console.log("came 2");
            authoriRoles(['ADMIN'])(req, res, () => {
                console.log("came 3");
                console.log("prrouter");
                handleCategoryUpdate(req, res);
            });

        });

    } else if (req.method === 'DELETE' && req.url.match(/^\/categories\/delete\/\d+$/)) {
        jwtAuthentication(req, res, () => {
            console.log("came 2");
            authoriRoles(['ADMIN'])(req, res, () => {
                console.log("came 3");
                console.log("prrouter");
                handleCategoryDeletion(req, res);
            });

        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
}