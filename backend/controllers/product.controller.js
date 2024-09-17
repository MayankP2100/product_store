import Product from "../models/productSchema.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log('Error in getting products: ' + error.message);
        res.status(500).json({success: false, message: 'Could not GET products'});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        res.status(400).json({success: false, message: 'Enter all fields'});
    }

    const newProduct = Product(product);

    try {
        await newProduct.save();
        res.status(200).json({success: true, data: newProduct});
    } catch (error) {
        console.log('Error in creating product: ' + error.message);
        res.status(500).json({success: false, message: 'Could not CREATE product'});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid id'});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.log('Error in updating product: ' + error.message);
        res.status(500).json({success: false, message: 'Could not UPDATE product: '});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid id'});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        console.log('Error in deleting product: ' + error.message);
        res.status(500).json({success: false, message: 'Could not DELETE product'});
    }
}