import express from "express";
import Router from 'express'
import {deleteProduct, GetFilter, updateProduct, SearchProduct, CreateProduct, getId} from "../controllers/e_comm.product.controller.js";
const router = Router();


// GET /api/products - Get all with Category and Price filtering
router.get('/', GetFilter)


// Search by name (Case-insensitive)
router.get('/search',SearchProduct)


//Get by Id
router.get('/:id', getId)


// Create a new product
router.post('/', CreateProduct)


// Update specific fields of a product
router.patch('/:id', updateProduct)


// DELETE /api/products/:id - Remove a product from the database
router.delete('/:id', deleteProduct)




export default router;