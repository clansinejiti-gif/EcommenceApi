import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Item name required']
    },
    category:{
        type: String,
        required: [true, 'Item  category name required']
    },
    price:{
        type: Number,
        required: [true, 'Item price required']
    }
},{timestamps: true})

export const item = mongoose.model('item', itemSchema)