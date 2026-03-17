import express from 'express';
import Order from '../models/e_commence.orders.models.js';
import {createOrder, Delete, getAll, getOne, patchOrder} from "../controllers/e.commence.orders.controllers.js";

const router = express.Router();

// --- CREATE ---
// POST /api/orders - Place a new order
router.post('/', createOrder);

// --- READ ---
// GET /api/orders - Get all orders (with product details populated)
router.get('/', getAll);

// GET /api/orders/:id - Get a specific order
router.get('/:id', getOne);

// --- UPDATE ---
// PATCH /api/orders/:id - Update order status (e.g., mark as 'completed')
router.patch('/:id', patchOrder);

// --- DELETE ---
// DELETE /api/orders/:id - Cancel/Remove an order
router.delete('/:id', Delete);

export default router;
