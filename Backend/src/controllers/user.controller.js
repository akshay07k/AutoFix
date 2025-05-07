import Car from '../models/car.model.js';
import Cart from '../models/cart.model.js';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select('-password');

    return res.status(200).json(
        new ApiResponse(200, users, 'Users fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching users', [error]);
  }
});

const getUserById = asyncHandler(async (req, res) => {
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

const createUser = asyncHandler(async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.email || !userData.password || !userData.name) {
      throw new ApiError(400, 'Email, password , and name are required');
    }

    console.log(userData);
    
    
    const newUser = new User(userData);


    // create a cart for the user
    const cart = new Cart({
        userId: newUser._id,
        items: [],
    });
    cart.save();

    newUser.cartId = cart._id;
    newUser.save();


    const { password, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json(
        new ApiResponse(201, userWithoutPassword, 'User created successfully')
    );
  } catch (error) {
    throw new ApiError(400, 'Error creating user', [error]);
  }
});

const updateUser = asyncHandler(async (req, res) => {
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

const deleteUser = asyncHandler(async (req, res) => {
  try {

    const user = await User.findById(req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    // Delete the user's cart
    if (user.cartId) {
      await Cart.findByIdAndDelete(user.cartId);
    }

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

const loginUser = asyncHandler(async (req, res) => {
  try {
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
  
    req.session.userId = user._id.toString();
    const { password: _, ...userWithoutPassword } = user.toObject();
    return res.status(200).json(
        new ApiResponse(200, userWithoutPassword, 'Login successful')
    );
  } catch (error) {
    throw new ApiError(401, 'Error logging in', [error]);
  }
});

const logout = asyncHandler(async (req, res) => {
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

const addCar = asyncHandler(async (req, res) => {
  try {
    const carDetails = req.body;
    const { userId } = req.params;
  
    if (!carDetails) {
      throw new ApiError(400, 'Car details are required');
    }
  
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
  
    carDetails.owner = user._id;
    
    const car = new Car(carDetails);
    car.save();
    user.cars.push(car._id);
    user.save();
    return res.status(201).json(
        new ApiResponse(201, car, 'Car added successfully')
    );
  } catch (error) {
    throw new ApiError(400, 'Error adding car', [error]);
  }
});

const getAllCars = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('cars');
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    const cars = user.cars;
    if (!cars || cars.length === 0) {
      throw new ApiError(404, 'No cars found for this user');
    }
    return res.status(200).json(
        new ApiResponse(200, cars, 'Cars fetched successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error fetching cars', [error]);
  }
});

const getUserStats = asyncHandler(async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: {
            $sum: {
              $cond: [
                { $eq: ["$role", "user"] },
                1,
                0
              ]
            }
          },
        }
      }
    ]);

    // stats will be something like [{ _id: null, totalUsers: 25 }]
    const { totalUsers = 0 } = stats[0] || {};

    return res.status(200).json(
      new ApiResponse(200, { totalUsers }, 'User statistics fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching user statistics', [error]);
  }
});




export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logout,
    addCar,
    getAllCars,
    getUserStats
}