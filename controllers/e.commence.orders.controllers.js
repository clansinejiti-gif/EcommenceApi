import express from 'express';
import Order from '../models/e_commence.orders.models.js';
import Product from '../models/e_commence.products.models.js';


// --- CREATE ---
// POST /api/orders - Place a new order
export const createOrder = async (req, res) => {
  try {
    const { customerName, items, status } = req.body; 
    
    let runningTotal = 0;
    const itemsWithPrices = [];

    // Process each item in the array
    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found.` });
      }

      // Calculation: Price * Quantity
      const subtotal = product.price * item.quantity;
      runningTotal += subtotal;

      // Prepare the item object with the price snapshot
      itemsWithPrices.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
    }

    const newOrder = new Order({
      customerName,
      items: itemsWithPrices,
      total: runningTotal,
      status: status || 'processing'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};


// --- READ ---
export const getAll=  async (req, res) => {
    try {
        const orders = await Order.find().populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// GET /api/orders/:id - Get a specific order
export const getOne = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.productId');
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: "Invalid Order ID" });
    }
};

// --- UPDATE ---
export const patchOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: "Update failed" });
    }
};

// --- DELETE ---
export const Delete = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
        res.status(204).send(); // 204 No Content is standard for successful delete
    } catch (error) {
        res.status(400).json({ message: "Delete failed" });
    }
};

