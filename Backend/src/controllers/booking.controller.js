import Booking from '../models/booking.model.js';
import Cart from '../models/cart.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createBooking = asyncHandler(async (req, res) => {
  try {
    const { userId, items, location, scheduleTime, totalAmount } = req.body;

    if (!items || items.length === 0) {
      throw new ApiError(400, 'Cart items are required to create a booking');
    }

    const sanitizedItems = items.map(item => ({
      service: {
        title: item.service.title,
        price: parseInt(item.service.price),
        features: item.service.features
      },
      carDetails: {
        carMake: item.carDetails.carMake,
        carModel: item.carDetails.carModel,
        year: parseInt(item.carDetails.year),
        licensePlate: item.carDetails.licensePlate,
      },
    }));

    // console.log('Sanitized Items:', sanitizedItems);
    
    
    const newBooking = new Booking({
      userId,
      items: sanitizedItems,
      location,
      scheduleTime,
      totalAmount: totalAmount,
    });

    // console.log('New Booking:', newBooking);
    

    newBooking.save();
    
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    return res.status(201).json(
        new ApiResponse(201, newBooking, 'Booking created successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, 'Error creating booking', [error]);
  }
});

const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json(
        new ApiResponse(200, bookings, 'Bookings fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching bookings', [error]);
  }
});

const getBookingById = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    return res.status(200).json(
        new ApiResponse(200, booking, 'Booking fetched successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error fetching booking', [error]);
  }
});

const getBookingsByUser = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    return res.status(200).json(
        new ApiResponse(200, bookings, 'User bookings fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching user bookings', [error]);
  }
});

const cancelBooking = asyncHandler(async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      throw new ApiError(404, 'Booking not found');
    }
    return res.status(200).json(
        new ApiResponse(200, null, 'Booking cancelled successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error cancelling booking', [error]);
  }
});


const updateBookingStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    return res.status(200).json(
        new ApiResponse(200, booking, 'Booking status updated successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error updating booking status', [error]);
  }
});

export {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingsByUser,
    cancelBooking,
    updateBookingStatus
}