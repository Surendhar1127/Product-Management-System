const CategoryModel = require('../models/categoryModel');

exports.createCategory=async (CategoryData)=>{
    console.log('service');
    const Category=CategoryModel.createCategory(CategoryData);
    return Category;

};

exports.getCategory=async ()=>{
    console.log('service');
    const Category=CategoryModel.getCategory();
    return Category;

};

exports.getCategoryById=async (id)=>{
    console.log('service');
    const Category=CategoryModel.getCategoryById(id);
    return Category;

};

exports.updateCategoryById=async (CategoryData,id)=>{
    console.log('service');
    const Category=CategoryModel.updateCategoryById(CategoryData,id);
    return Category;

};

exports.deleteCategoryById=async (id)=>{
    console.log('service');
    const Category=CategoryModel.deleteCategoryById(id);
    return Category;

};