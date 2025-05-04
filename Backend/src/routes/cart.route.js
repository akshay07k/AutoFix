import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cart.controller.js';

const router = express.Router();


router.get('/getCart/:cartId', getCart);
router.post('/addToCart/:cartId', addToCart);
router.put('/updateCart/:cartId/:itemIndex', updateCartItem);
router.delete('/removeFromCart/:cartId/:itemIndex', removeFromCart);
router.delete('/clearCart/:cartId', clearCart);

export default router;