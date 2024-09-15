
const { verifyToken } = require("../utils/jwtutil")

const jwtAuthentication = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];

    if (!header) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Authorization header missing' }));
    }
    
    if (!token) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Kindly enter the token' }));
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        console.log("token sucess");
        next();
    } catch (err) {
        console.log("token faileure");
        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid or expired token' }));
    }
};

const authoriRoles = (allowedRoleS) => {
    console.log("came role");
    return (req, res, next) => {
         console.log(`${req.user.role} --${allowedRoleS}`);
        
        if (!allowedRoleS.includes(req.user.role)) {
            console.log("came role 2");
            res.writeHead(403, { 'Content-Type': 'application/json' });
           return res.end(JSON.stringify({ message: 'Access denied: You dont have permissions' }));
        }
        next();
    };
};

module.exports={jwtAuthentication,authoriRoles};