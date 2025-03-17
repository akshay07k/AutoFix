import { Schema, model } from 'mongoose';
import { IServiceDoc } from '../types';

export const serviceSchema = new Schema<IServiceDoc>(
    {
        category: { 
            type: String, 
            required: true
        },
        title: { 
            type: String, 
            required: true, 
            unique: true 
        },
        price: { 
            type: String, 
            required: true 
        },
        features: { 
            type: [String], 
            required: true 
        },
        recommended: { 
            type: Boolean, 
            default: false 
        },
    }
);

const Service = model<IServiceDoc>('Service', serviceSchema);

export default Service;