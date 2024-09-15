const redis = require('redis');

const redisClient = redis.createClient();


(async () => {
    
    redisClient.on('error', (err) => {
        console.error('Redis error:', err);
    });

    
    redisClient.on('ready', () => {
        console.log('Redis client connected');
    });

   
    redisClient.on('end', () => {
        console.log('Redis client disconnected');
    });

    await redisClient.connect();

    await redisClient.ping();
})();

module.exports = redisClient;
