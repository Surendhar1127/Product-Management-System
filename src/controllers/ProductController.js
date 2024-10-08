const productService =require('../services/productService');
const {validateProduct}=require('../utils/validatore');

exports.handleProductCreation = (req, res) => {
  try {
    console.log('create Handling ');
    let body = '';

        req.on('data', chunk => {
          body += chunk.toString(); 
        });
    
        req.on('end', async () => {
          req.body = JSON.parse(body); 
          validateProduct(req.body, res);
          const product = await productService.createProduct(req.body);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(product));
        });
    
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};

exports.handleProductList=async(req,res)=>{
    try {
         console.log('get');
        const parsedUrl = url.parse(req.url, true); 
        
        const { categoryId, availabilityStatus, sort, page = 1, limit = 10 } = parsedUrl.query;
        
        const filter = { categoryId: categoryId ? Number(categoryId) : undefined, availabilityStatus };
        
       const product = await productService.getProduct(filter, sort, Number(page), Number(limit),req.ip);
      
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
 }

 exports.handleProductDetail=async(req,res)=>{
    try {
        console.log('get');
        const id = req.url.split('/')[3]; 
        const product = await productService.getProductById(id);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
 }

 exports.handleProductUpdate=async(req,res)=>{
    try {
        
        console.log('update');
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); 
        });
        req.on('end', async () => {
            req.body = JSON.parse(body); 

            validateProduct(req.body, res);
            const id = req.url.split('/')[3]; 
        const product = await productService.updateProductById(req.body,id);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
        });
        
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
 }

 exports.handleProductDeletion=async(req,res)=>{
    try {
        console.log('delete');
        const id = req.url.split('/')[3]; 
        const product = await productService.deleteProductById(id);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
 }
