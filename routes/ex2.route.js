import express from "express";
import Router from 'express'
import {item} from '../models/item.ex2.js'
const router = Router();
router.post('/add', async (req, res) => {
    const {name, category, price} = req.body;
    try {
       if (!name || !category || !price) {
            res.status(400).json({Error: "All input fields are required"})
        }
        const newItem = new item({
            name: name,
            category: category.toLowerCase(),
            price: price
        })
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({Error: 'failed to create item'})

    }
})

//Get all items

router.get('/', async (req, res) => {
    try{
        const items = await item.find();
    } catch (error) {
        res.status(500).json(error)
    }
})


//Get items by query filtering

router.get('/', async (req, res) => {
    try{
        const cat = req.query.category;
        const category = cat.toLowerCase()
        if(!category){
            res.statusCode(404).json({Error: 'Item not found'})
        }
        const items = await item.find(category);
        res.json(items);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    try{
        const ids = parseFloat(req.params.id);
        if(!ids){
            res.statusCode(404).json({Error: 'Id not found'})
        }
        const items = await item.findOne(ids);
        res.json(items);
    } catch (error) {
        res.status(500).json(error)
    }
})

export default  router;