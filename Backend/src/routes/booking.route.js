import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  cancelBooking,
  updateBookingStatus,
} from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/updateBookingStatus/:id', updateBookingStatus);
router.post('/createBooking', createBooking);
router.get('/getAllBookings', getAllBookings);
router.get('/getBookingById/:id', getBookingById);
router.get('/getBookingsByUser/:userId', getBookingsByUser);
router.delete('/cancelBooking/:id', cancelBooking);

export default router;