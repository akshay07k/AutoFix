import { Request, Response } from 'express';
import User from '../models/user.model';
import { IUserDoc } from '../types';
import { ApiError, ApiResponse, asyncHandler } from '../utils';


const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');

    return res.status(200).json(
        new ApiResponse(200, users, 'Users fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching users', [error]);
  }
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(
        new ApiResponse(200, user, 'User fetched successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error fetching user', [error]);
  }
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userData: IUserDoc = req.body;
    const newUser = new User(userData);
    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json(
        new ApiResponse(201, userWithoutPassword, 'User created successfully')
    );
  } catch (error) {
    throw new ApiError(400, 'Error creating user', [error]);
  }
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');

    if (!updatedUser) {
      throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(
        new ApiResponse(200, updatedUser, 'User updated successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, 'Error updating user', [error]);
  }
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(
        new ApiResponse(200, null, 'User deleted successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error deleting user', [error]);
  }
});


export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}