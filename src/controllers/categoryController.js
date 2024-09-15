const CategoryService =require('../services/categoryService');
const {validateProduct}=require('../utils/validatore');

exports.handleCategoryCreation = (req, res) => {
  try {
    console.log('create');
    let body = '';

        req.on('data', chunk => {
          body += chunk.toString(); 
        });
    
        req.on('end', async () => {
          req.body = JSON.parse(body); 
        //   validateCategory(req.body, res);
          const Category = await CategoryService.createCategory(req.body);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(Category));
        });
    
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};

exports.handleCategoryList=async(req,res)=>{
    try {
        console.log('get');
        const Category = await CategoryService.getCategory();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Category));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
 }

 exports.handleCategoryDetail=async(req,res)=>{
    try {
        console.log('get');
        const id = req.url.split('/')[3]; 
        const Category = await CategoryService.getCategoryById(id);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Category));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
 }

 exports.handleCategoryUpdate=async(req,res)=>{
    try {
        
        console.log('update');
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); 
        });
        req.on('end', async () => {
            req.body = JSON.parse(body); 

            validateCategory(req.body, res);
            const id = req.url.split('/')[3]; 
        const Category = await CategoryService.updateCategoryById(req.body,id);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Category));
        });
        
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
 }

 exports.handleCategoryDeletion=async(req,res)=>{
    try {
        console.log('delete');
        const id = req.url.split('/')[3]; 
        const Category = await CategoryService.deleteCategoryById(id);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Category));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
 }