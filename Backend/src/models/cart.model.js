import { Schema, model } from 'mongoose';

export const cartItemSchema = new Schema(
    {
        service: {
            type: Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        },
        carDetails: {
            type: Schema.Types.ObjectId,
            ref: 'Car',
            required: true
        }
    }
);

const cartSchema = new Schema(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            required: true, 
            ref: 'User' 
        },
        items: [cartItemSchema],
    }
);

const Cart =  model('Cart', cartSchema);

export default Cart;