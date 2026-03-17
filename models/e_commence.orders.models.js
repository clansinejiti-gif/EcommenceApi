import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      priceAtPurchase: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    default: 0
  },
  status:{
    type: String,
    required: true,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Order = mongoose.model('Order', orderSchema);
export default Order;