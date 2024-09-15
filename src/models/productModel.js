const { client } = require('../config/DataBaseConfig');
const redisClient = require('../cache/redis');


const getProduct = async (filter = {}, sort = 'created_at', page = 1, limit = 10) => {
    console.log("getProduct:");
    const { categoryId, availabilityStatus } = filter;

    const offset = (page - 1) * limit;

    const cacheKey = `products:${JSON.stringify({ categoryId, availabilityStatus, sort, page, limit })}`;

    try {
       
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        let query = 'SELECT * FROM products WHERE TRUE';
        const values = [];
        let parameterIndex = 1;

      
        if (categoryId) {
            query += ` AND category_id = $${parameterIndex++}`;
            values.push(categoryId);
        }

        if (availabilityStatus) {
            query += ` AND availability_status = $${parameterIndex++}`;
            values.push(availabilityStatus);
        }

     
        const validSortFields = ['name', 'price', 'created_at'];
        if (validSortFields.includes(sort)) {
            query += ` ORDER BY ${sort}`;
        } else {
            query += ' ORDER BY created_at'; 
        }

       
        query += ' LIMIT $' + parameterIndex++ + ' OFFSET $' + parameterIndex++;
        values.push(limit, offset);

       
        const result = await client.query(query, values);
        const products = result.rows;

       
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(products)); 
        return products;
    } catch (error) {
        console.error('Error retrieving products:', error);
        throw error;
    }
};



const createProduct=async (data)=>{
    console.log(data);
    const query = 'INSERT INTO products (name, description, price, category_id, availability_status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *';
    const values = [data.name, data.description, data.price, data.category_id, data.availability_status];
    console.log(
       values
    );
    
    try {
        const response = await client.query(query, values);  
        console.log("Database response:", response);
        return response.rows[0];  
    } catch (error) {
        console.error("Error creating product:", error);
        throw error; 
    }
};





const getProductById=async (id)=>{
    console.log("get");
    const query = 'SELECT * FROM products WHERE id=$1';
    try {
        const response = await client.query(query,[id]);  
        console.log("Database response:", response);
        return response.rows[0];  
    } catch (error) {
        console.error("Error creating product:", error);
        throw error; 
    }
}

const updateProductById=async (data,id)=>{
    console.log("Updating ");
    const query = `
        UPDATE products 
        SET name = $1, description = $2, price = $3, category_id = $4, availability_status = $5, updated_at = NOW() 
        WHERE id = $6 
        RETURNING *`;
    const values = [data.name, data.description, data.price, data.category_id, data.availability_status, id];

    try {
        const response = await client.query(query, values);
        if (response.rowCount === 0) {
            throw new Error('Product not found');
        }
        console.log("Product updated:", response.rows[0]);
        return response.rows[0]; 
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}


const deleteProductById=async (id)=>{
    console.log("Deleting");
    const query = 'DELETE FROM products WHERE id = $1 RETURNING * ';

    try {
        const response = await client.query(query, [id]);
        if (response.rowCount === 0) {
            throw new Error('Product not found');
        }
        console.log("Product deleted:", response.rows[0]);
        return response.rows[0];  
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}



module.exports={createProduct,getProduct,getProductById,updateProductById,deleteProductById};