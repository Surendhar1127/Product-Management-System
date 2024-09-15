const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtutil');
const { client } = require('../config/DataBaseConfig');

exports.registerUser = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    console.log(body);
    req.on('end', async () => {
    const { name, password, role } =JSON.parse(body);
  
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO app_users (name, password, role) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, hashedPassword, role];

    try {
        const result = await client.query(query, values);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows[0]));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error registering user' }));
    }
});
};

exports.loginUser = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    console.log(body);
    req.on('end', async () => {
    const { name, password } = JSON.parse(body);

    try {
        const query = 'SELECT * FROM app_users WHERE name = $1';
        const result = await client.query(query, [name]);

        if (result.rows.length === 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }

        const user = result.rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid credentials' }));
        }

        const token = generateToken(user);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error logging in', error: err.message }));
    }
});
};

