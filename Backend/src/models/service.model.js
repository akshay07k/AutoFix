import { Schema, model } from 'mongoose';

export const serviceSchema = new Schema(
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

const Service = model('Service', serviceSchema);

export default Service;