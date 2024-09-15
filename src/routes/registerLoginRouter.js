const {registerUser,loginUser}=require('../controllers/authController');

module.exports=(req,res)=>{
    console.log("2a");
    if (req.method === 'POST' && req.url === '/user/register') {
         console.log("2b");
        registerUser(req, res);
    } else if(req.method === 'POST' && req.url === '/user/login') {
        loginUser(req, res);
    }
    else{
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
}