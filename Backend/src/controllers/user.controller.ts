import { Request, Response } from 'express';
import User from '../models/user.model';
import { IUser } from '../types';
import { ApiError, ApiResponse, asyncHandler } from '../utils';
import { Session, SessionData } from 'express-session';
import { Types } from 'mongoose';

interface CustomRequest extends Request {
    session: Session & Partial<SessionData> & { userId?: string };
}


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
    const userData: IUser | any = req.body;

    if (!userData.email || !userData.password || !userData.name) {
      throw new ApiError(400, 'Email, password , and name are required');
    }
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
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
      throw new ApiError(404, 'User not found');
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, { new: true }).select('-password');

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

const login = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
  }
  const user = await User.findOne({ email });
  if (!user) {
      throw new ApiError(401, 'Invalid credentials');
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid credentials');
  }

  req.session.userId = (user._id as Types.ObjectId).toString();
  const { password: _, ...userWithoutPassword } = user.toObject();
  return res.status(200).json(
      new ApiResponse(200, userWithoutPassword, 'Login successful')
  );
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  req.session.destroy((err) => {
      if (err) {
          throw new ApiError(500, 'Error logging out');
      }
      res.clearCookie('connect.sid');
      return res.status(200).json(
          new ApiResponse(200, null, 'Logout successful')
      );
  });
});


export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout
}