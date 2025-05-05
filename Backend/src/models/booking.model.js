import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  service: {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    features: { type: [String], required: true },
  },
  carDetails: {
    carMake: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true },
  },
});

const locationSchema = {
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
};

const scheduleSchema = {
  date: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
};


const bookingSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    },
    items: [itemSchema],
    location: { 
      type: locationSchema, 
      required: true 
    },
    scheduleTime: { 
      type: scheduleSchema, 
      required: true 
    },
    totalAmount: { 
      type: Number, 
      required: true 
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true
  }
);

const Booking = model('Booking', bookingSchema);

export default Booking;