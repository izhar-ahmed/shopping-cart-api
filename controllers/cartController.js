const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createCart = async (req, res) => {
    try {


        const { userId, items } = req.body;

        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ message: "User ID and at least one item are required." });
        }

        const cart = await Cart.findOne({userId})
        if(!cart){
            
            const cart = new Cart({userId, items})
            await cart.save()
            res.status(200).json({message: "Cart created successfully", cart})
        } else {
            for(const item of items) {
                const existingItem = cart.items.find(item => item.productId.toString() === item.productId)
                if(existingItem) {
                    existingItem.quantity += item.quantity
                } else {
                    cart.items.push(item)
                }
            }

            await cart.save()
            res.status(200).json({ message: "Cart updated successfully", cart });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error });
    }
};


const getCart = async (req, res) => {
    try {
        const userId = req.params.userId; 
        let subtotal = 0
        let discount = 0
        let totalPrice = 0
        let tax = 0
        const itemList = []

        const cart = await Cart.findOne({
            userId: userId
        })
        if(!cart) {
            return res.status(400).json({message: "Cart not found"})
        }
                

        for(const item of cart.items) {
            const product = await Product.findById(item.productId)
            if(!product){
                return res.status(400).json({message: "Product not found"})
            }
            
            itemList.push(product.name)
            const itemSubtotal = product.price * item.quantity;
            subtotal += itemSubtotal;
            
        console.log(subtotal)
            if(product.offer === "Buy 2 Get 1 Free"){
                discount = Math.floor(item.quantity/3) * product.price
            }
        }

        totalPrice = subtotal - discount;

        tax = Math.round((12.5 / 100) * totalPrice);
        totalPrice += tax;


        const data = {
            subtotal,
            discount,
            tax,
            totalPrice,
            itemList
        }
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const deleteCart = async(req, res)=> {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({userId})
        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }
        const deleteCart = await Cart.findByIdAndDelete(cart._id)
        if(!deleteCart) {
            return res.status(400).json({message: "Cart not deleted"})
        }
        res.status(200).json({message: "Cart deleted successfully", deleteCart})

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = {createCart, getCart, deleteCart};
