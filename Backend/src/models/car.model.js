import { Schema, model } from "mongoose";

export const carSchema = new Schema(
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
        owner: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
        }
    }
);


const Car = model('Car', carSchema);
export default Car;