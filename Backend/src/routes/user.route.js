import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  addCar,
  getAllCars,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/addCar/:userId', addCar);
router.get('/getAllCars/:userId', getAllCars);

// For Admin
router.get('/getAllUsers', getAllUsers);
router.get('/:id', getUserById);
router.put('/update', updateUser);
router.delete('/:id', deleteUser);

export default router;