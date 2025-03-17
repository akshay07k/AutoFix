import { Schema, model } from 'mongoose';
import { IUserDoc } from '../types';

export const carDetailsSchema = new Schema(
    {
        carMake: { 
            type: String, 
            required: true 
        },
        carModel: { 
            type: String, 
            required: true 
        },
        year: { 
            type: String, 
            required: true 
        },
        licensePlate: { 
            type: String, 
            required: true 
        },
    }
);

const userSchema = new Schema<IUserDoc>(
    {
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            default: 'user' 
        },
        cartId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Cart' 
        },
        cars: { 
            type: [carDetailsSchema], 
            default: [] 
        }
    },
    {
        timestamps: true
    }
);

export default model<IUserDoc>('User', userSchema);