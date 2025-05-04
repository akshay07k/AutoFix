import Cart from '../models/cart.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId).populate('items.service').populate('items.carDetails');

    if (!cart) {
      return res.status(200).json(
        new ApiResponse(200, { cartId: req.params.cartId, items: [] }, 'Cart is empty')
      );
    }

    return res.status(200).json(
        new ApiResponse(200, cart, 'Cart fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching cart', [error]);
  }
});

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { cartId } = req.params;
    const { service, carDetails } = req.body;

    if (!service || !carDetails) {
      throw new ApiError(400, 'Service and carDetails are required');
    }

    let cart = await Cart.findById(cartId);
    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    const newItem = { service, carDetails };
    cart.items.push(newItem);
    
    cart.save();

    return res.status(201).json(
      new ApiResponse(201, cart, 'Item added to cart successfully')
    );
  } catch (error) {
    throw new ApiError(400, 'Error adding to cart', [error.message]);
  }
});


const updateCartItem = asyncHandler(async (req, res) => {
  try {
    const { cartId, itemIndex } = req.params;
    const updatedItem = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart || parseInt(itemIndex) >= cart.items.length) {
      throw new ApiError(404, 'Cart or item not found');
    }

    cart.items[parseInt(itemIndex)] = updatedItem;
    cart.save();


    return res.status(200).json(
        new ApiResponse(200, cart, 'Cart item updated successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, 'Error updating cart item', [error]);
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { cartId, itemIndex } = req.params;

    const cart = await Cart.findById(cartId);
    if (!cart || parseInt(itemIndex) >= cart.items.length) {
      throw new ApiError(404, 'Cart or item not found');
    }
    cart.items.splice(parseInt(itemIndex), 1);
    cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, 'Item removed from cart successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error removing from cart', [error]);
  }
});

const clearCart = asyncHandler(async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findByIdAndUpdate(cartId, { items: [] }, { new: true });
    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    return res.status(200).json(
        new ApiResponse(200, cart, 'Cart cleared successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error clearing cart', [error]);
  }
});

export {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
}