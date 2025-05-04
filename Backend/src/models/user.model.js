import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new Schema(
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
            ref: 'Cart',
            default: null
        },
        cars: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Car',
            },
        ]
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

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};


export default model('User', userSchema);