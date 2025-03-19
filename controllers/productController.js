const Product = require("../models/Product");
const { findByIdAndUpdate } = require("../models/User");

const createProduct = async(req, res)=> {
    try {
        console.log("Inside controller function")
        const { name, price, description, stock, offer } = req.body

        const product = await Product.findOne({name})
        if(product) {
           return res.status(400).json({message: "product is already exit. if not in stock update the stock"})
        }

        const newProduct = new Product({name, price, description, stock, offer})
        newProduct.save()

        res.status(200).json(newProduct)

    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

const getAllProducts = async(req, res)=>{
    try {
        const products = await Product.find() 
        if(products.length === 0){
          return res.status(400).json({message: "There is no product"})
        }

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

const findProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(400).json({message: "Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

const updateProductById = async (req, res)=> {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updateProduct){
           return res.status(400).json({message: "Product not found"})
        }
        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

const deleteProductById = async (req, res)=> {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)

        if(!deleteProduct){
            return res.status(400).json({message: "Product not found"})
        }
    res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

module.exports = {createProduct, getAllProducts, findProductById, updateProductById, deleteProductById}