import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  cancelBooking,
  updateBookingStatus,
  getBookingStats,
  getrecentBookings,
} from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/updateBookingStatus/:id', updateBookingStatus);
router.post('/createBooking', createBooking);
router.get('/getAllBookings', getAllBookings);
router.get('/getBookingById/:id', getBookingById);
router.get('/getBookingsByUser/:userId', getBookingsByUser);
router.delete('/cancelBooking/:id', cancelBooking);
router.get('/stats', getBookingStats);
router.get('/recentBookings', getrecentBookings);

export default router;