import express from "express";
import Product from '../models/e_commence.products.models.js'

export const GetFilter = async (req, res) => {
    try {
        const { category, minPrice } = req.query;
        let query = {};


        const products = await Product.find(query);
        res.json({
            count: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const SearchProduct = async (req, res) => {
    try {
        const min = parseFloat(req.query.minPrice);
        let filter = {};
        if(req.quert.category) 
            filter.category = req.query.category
        if(min>=0 && !isNaN(min)){
            filter.price = {$gte: min};
        }
        const products = await Product.find(filter)
        res.status(202).send(products);
    } catch (error) {
        res.status(500).json({ error: "Search failed" });
    }
};

// POST /api/products - Create a new product
export const CreateProduct = async (req, res) => {
    try {
        const { name, category, price, stock, description } = req.body;

                if (!name || !category || !price) {
            return res.status(400).json({ message: "Name, category, and price are required" });
        }

        const newProduct = new Product({
            name,
            category,
            price,
            stock: stock || 0, // Default to 0 if not provided[span_10](end_span)
            description
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not save product", details: error.message });
    }
};



// PATCH /api/products/:id - Update specific fields of a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // { new: true } returns the document AFTER the update is applied
        // { runValidators: true } ensures the new data follows your Schema rules
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct); // Status 200 OK
    } catch (error) {
        res.status(400).json({ message: "Update failed. Check your ID or data format." });
    }
};


//Remove a product from the database
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Status 204 means "No Content" - the standard for successful deletion
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: "Invalid ID format" });
    }
};


export const getId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)
        const products = await Product.findById(id);
        console.log(products);

        if (!products) {
            return res.status(404).json({ message: "Product not found" });
        }

    
        res.status(201).send(products);
    } catch (error) {
        res.status(400).json({ message: "Invalid ID format" });
        console.log(`Error is ${error}`)
        console.error();
        
    }
};






