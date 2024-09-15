const productModel = require('../models/productModel');

exports.createProduct=async (productData)=>{
    console.log('Create service');
    const product=productModel.createProduct(productData);
    return product;

};

exports.getProduct=async ()=>{
    console.log('service');
    const product=productModel.getProduct();
    return product;

};

exports.getProductById=async (id)=>{
    console.log('service');
    const product=productModel.getProductById(id);
    return product;

};

exports.updateProductById=async (productData,id)=>{
    console.log('service');
    const product=productModel.updateProductById(productData,id);
    return product;

};

exports.deleteProductById=async (id)=>{
    console.log('service');
    const product=productModel.deleteProductById(id);
    return product;

};