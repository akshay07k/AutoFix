import { Schema, model } from 'mongoose';
import { IBookingDoc } from '../types';
import { cartItemSchema } from './cart.model';

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


const bookingSchema = new Schema<IBookingDoc>(
  {
    userId: { 
      type: String, 
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

const Booking = model<IBookingDoc>('Booking', bookingSchema);

export default Booking;