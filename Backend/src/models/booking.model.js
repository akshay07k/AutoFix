import { Schema, model } from 'mongoose';
import { cartItemSchema } from './cart.model.js';

const locationSchema = new Schema(
  {
      name: { 
        type: String, 
        required: true 
      },
      address: { 
        type: String, 
        required: true 
      },
      city: { 
        type: String, 
        required: true 
      },
      state: { 
        type: String, 
        required: true 
      },
      pin: { 
        type: String, 
        required: true 
      },
      country: { 
        type: String, 
        required: true 
      },
  }
);

const scheduleSchema = new Schema(
  {
    date: { 
      type: String, 
      required: true 
    },
    time: { 
      type: String, 
      required: true 
    },
  }
);


const bookingSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    },
    cartItems: [cartItemSchema],
    location: { 
      type: locationSchema, 
      required: true 
    },
    schedule: { 
      type: scheduleSchema, 
      required: true 
    },
    totalAmount: { 
      type: Number, 
      required: true 
    }
  },
  {
    timestamps: true
  }
);

const Booking = model('Booking', bookingSchema);

export default Booking;