const {client}=require('../config/DataBaseConfig');


const createCategory=async (data)=>{
    console.log(data);
    const query = 'INSERT INTO categories (name,created_at, updated_at) VALUES ($1,NOW(), NOW()) RETURNING *';
    const values = [data.name];
    
    try {
        const response = await client.query(query, values);  
        console.log("Database response:", response);
        return response.rows[0];  
    } catch (error) {
        console.error("Error creating Category:", error);
        throw error; 
    }
}


const getCategory=async ()=>{
    console.log("get");
    const query = 'SELECT * FROM categories';
    try {
        const response = await client.query(query);  
        console.log("Database response:", response);
        return response.rows[0];  
    } catch (error) {
        console.error("Error creating Category:", error);
        throw error; 
    }
}

const getCategoryById=async (id)=>{
    console.log("get");
    const query = 'SELECT * FROM categories WHERE id=$1';
    try {
        const response = await client.query(query,[id]);  
        console.log("Database response:", response);
        return response.rows[0];  
    } catch (error) {
        console.error("Error creating Category:", error);
        throw error; 
    }
}

const updateCategoryById=async (data,id)=>{
    console.log("Updating ");
    const query = `
        UPDATE categories 
        SET name = $1, updated_at = NOW() 
        WHERE id = $2
        RETURNING *`;
    const values = [data.name, data.description, data.price, data.category_id, data.availability_status, id];

    try {
        const response = await client.query(query, values);
        if (response.rowCount === 0) {
            throw new Error('Category not found');
        }
        console.log("Category updated:", response.rows[0]);
        return response.rows[0]; 
    } catch (error) {
        console.error("Error updating Category:", error);
        throw error;
    }
}


const deleteCategoryById=async (id)=>{
    console.log("Deleting");
    const query = 'DELETE FROM categories WHERE id = $1 RETURNING * ';

    try {
        const response = await client.query(query, [id]);
        if (response.rowCount === 0) {
            throw new Error('Category not found');
        }
        console.log("Category deleted:", response.rows[0]);
        return response.rows[0];  
    } catch (error) {
        console.error("Error deleting Category:", error);
        throw error;
    }
}



module.exports={createCategory,getCategory,getCategoryById,updateCategoryById,deleteCategoryById};