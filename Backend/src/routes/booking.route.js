import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  cancelBooking,
} from '../controllers/booking.controller.js';

const router = express.Router();


router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.get('/user/:userId', getBookingsByUser);
router.delete('/:id', cancelBooking);

export default router;