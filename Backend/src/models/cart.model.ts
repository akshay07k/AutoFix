import { Schema, model } from 'mongoose';
import { ICartDoc } from '../types';
import { carDetailsSchema } from './user.model';
import { serviceSchema } from './service.model';

export const cartItemSchema = new Schema(
    {
        service: {
            type: serviceSchema,
            required: true
        },
        carDetails: {
            type: carDetailsSchema,
            required: true
        }
    }
);

const cartSchema = new Schema<ICartDoc>(
    {
        userId: { 
            type: String, 
            required: true, 
            ref: 'User' 
        },
        items: [cartItemSchema],
    }
);

const Cart =  model<ICartDoc>('Cart', cartSchema);

export default Cart;