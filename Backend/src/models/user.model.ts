import { Schema, model } from 'mongoose';
import { IUserDoc } from '../types';
import bcrypt from "bcrypt";

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


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(this: IUserDoc, password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};


export default model<IUserDoc>('User', userSchema);