exports.validateProduct = (product, res) => {
  console.log("validate1");
    if (!product.name || !product.price) {
      console.log("validate");
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Bad Request' }));
      return;
    }
  
  };