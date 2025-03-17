import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import { ICartDoc, ICartItem } from '../types';
import { ApiError, ApiResponse, asyncHandler } from '../utils';

const getCart = asyncHandler(async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(200).json(
        new ApiResponse(200, { userId: req.params.userId, items: [] }, 'Cart is empty')
      );
    }

    return res.status(200).json(
        new ApiResponse(200, cart, 'Cart fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching cart', [error]);
  }
});

const addToCart = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const newItem: ICartItem = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [newItem] });
    } else {
      cart.items.push(newItem);
    }
    await cart.save();

    return res.status(201).json(
        new ApiResponse(201, cart, 'Item added to cart successfully')
    );
  } catch (error) {
    throw new ApiError(400, 'Error adding to cart', [error]);
  }
});

const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId, itemIndex } = req.params;
    const updatedItem: ICartItem = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || parseInt(itemIndex) >= cart.items.length) {
      throw new ApiError(404, 'Cart or item not found');
    }

    cart.items[parseInt(itemIndex)] = updatedItem;
    await cart.save();


    return res.status(200).json(
        new ApiResponse(200, cart, 'Cart item updated successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, 'Error updating cart item', [error]);
  }
});

const removeFromCart = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId, itemIndex } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart || parseInt(itemIndex) >= cart.items.length) {
      throw new ApiError(404, 'Cart or item not found');
    }
    cart.items.splice(parseInt(itemIndex), 1);
    await cart.save();

    return res.status(200).json(
        new ApiResponse(200, cart, 'Item removed from cart successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error removing from cart', [error]);
  }
});

const clearCart = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOneAndUpdate({ userId }, { items: [] }, { new: true });
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