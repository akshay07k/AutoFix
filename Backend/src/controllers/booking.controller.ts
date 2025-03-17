import { Request, Response } from 'express';
import Booking from '../models/booking.model';
import Cart from '../models/cart.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

const createBooking = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId, cartItems, location, schedule } = req.body;

    if (!cartItems || cartItems.length === 0) {
      throw new ApiError(400, 'Cart items are required to create a booking');
    }

    const totalAmount = cartItems.reduce((total: number, item: any) => total + parseInt(item.service.price), 0);
    const newBooking = new Booking({
      userId,
      cartItems,
      location,
      schedule,
      totalAmount,
    });

    await newBooking.save();
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    return res.status(201).json(
        new ApiResponse(201, newBooking, 'Booking created successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, 'Error creating booking', [error]);
  }
});

const getAllBookings = asyncHandler(async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json(
        new ApiResponse(200, bookings, 'Bookings fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching bookings', [error]);
  }
});

const getBookingById = asyncHandler(async (req: Request, res: Response) => {
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

const getBookingsByUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    return res.status(200).json(
        new ApiResponse(200, bookings, 'User bookings fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching user bookings', [error]);
  }
});

const cancelBooking = asyncHandler(async (req: Request, res: Response) => {
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


export {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingsByUser,
    cancelBooking,
}