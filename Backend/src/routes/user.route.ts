import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);

// For Admin
router.get('/getAllUsers', getAllUsers);
router.get('/:id', getUserById);
router.put('/update', updateUser);
router.delete('/:id', deleteUser);

export default router;