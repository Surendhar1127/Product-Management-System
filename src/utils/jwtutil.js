require('dotenv').config();
const jwt=require('jsonwebtoken');

const secretKey=process.env.JWT_SECRET;

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        throw new Error('Invalid token');
    }
};

module.exports={generateToken,verifyToken};

