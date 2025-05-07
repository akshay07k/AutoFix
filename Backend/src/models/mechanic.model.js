import mongoose, { Schema } from 'mongoose';

const mechanicSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://example.com/default-avatar.png',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['available', 'busy', 'left'],
        default: 'available',
    },
    experience: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        default: 'No description provided',
    }
}, {
    timestamps: true,
});

const Mechanic = mongoose.model('Mechanic', mechanicSchema);
export default Mechanic;