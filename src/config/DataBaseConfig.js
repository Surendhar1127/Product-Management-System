const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
});



const connectDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to the database successfully');
  } catch (err) {
    console.error('connection error:', err);
    process.exit(1);
  }
};

module.exports = { connectDatabase, client };
