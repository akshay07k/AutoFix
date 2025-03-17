import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cart.controller';

const router = express.Router();


router.get('/:userId', getCart);
router.post('/:userId', addToCart);
router.put('/:userId/:itemIndex', updateCartItem);
router.delete('/:userId/:itemIndex', removeFromCart);
router.delete('/:userId', clearCart);

export default router;