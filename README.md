# Product-Management-System

Overview
This is a simple Product Management System implemented in Node.js. It provides endpoints to manage products and categories, with support for CRUD operations, filtering, sorting, and caching.

Prerequisites:

Node.js
PostgreSQL for the database
Docker

Installation:

1.Install dependencies:

npm install

2.Set up environment variables in .env:

DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

Running Locally:

1.Run the application:

npm start

The application will start and be available at http://localhost:8001.

2.Running with Docker:

docker pull surendhar001/product_management_nodeapp:latest

3.Running Tests:

The file is called product.test.js and category.test.js. Run the tests with npm run test.

Login API:

1.Register a new credentials:

Endpoint: http://localhost:8001/user/register

2.Login :

Endpoint: http://localhost:8001/user/login

After logging in, a token will be generated, which needs to be included in all endpoints .
For UPDATE, CREATE, and DELETE operations only ADMIN users have permission to perform these actions.


Products API:

1. Create a New Product
   
Endpoint: http://localhost:8001/products/create
JSON:
{
  "name": "Product Name",
  "description": "Product Description",
  "price": price,
  "category_id": 1,
  "availability_status": "in_stock"
}

3. Retrieve a List of All Products

Endpoint: http://localhost:8001/products/getAll?page=1&limit=10

Query Parameters:
page (Page no)
limit (Page Limit)
category_id ( Filter by category ID)
sort (Sort by name, price, or created_at)
availability_status (Filter by availability status)

3. Retrieve Product by ID

Endpoint: http://localhost:8001/products/get/id

4. Update Product Details
   
Endpoint: http://localhost:8001/products/update/id
JSON:
{
  "name": "Product Name",
  "description": "Product Description",
  "price": price,
  "category_id": 1,
  "availability_status": "in_stock"
}

6. Delete a Product

Endpoint: Endpoint: http://localhost:8001/products/delete/id

Categories API


1. Create a New Category
   
Endpoint: http://localhost:8001/categories/create

JSON:
{
  "name": "Category Name"
}

2. Retrieve a List of All Categories

Endpoint: http://localhost:8001/categories/getAll

3. Retrieve Categories by ID

Endpoint: http://localhost:8001/categories/get/id

4. Update Categories Details
   
Endpoint: http://localhost:8001/categories/update/id
JSON:
{
  "name": "Category Name"
}


6. Delete a Product

Endpoint: Endpoint: http://localhost:8001/categories/delete/id






 
