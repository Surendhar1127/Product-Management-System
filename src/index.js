require('dotenv').config({ path: '../.env' });
const server=require('./server');
const { connectDatabase } = require('./config/DataBaseConfig');
const port=process.env.PORT||8001;

connectDatabase();

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
