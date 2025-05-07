import Mechanic from '../models/mechanic.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createMechanic = asyncHandler(async (req, res) => {
    try {
        const { name, avatar, email, phone, address, experience, specialty, desc } = req.body;

        if (!name || !email || !phone || !address || !experience || !specialty) {
            throw new ApiError(400, 'All fields are required');
        }

        const newMechanic = new Mechanic({
            name,
            avatar,
            email,
            phone,
            address,
            experience,
            specialty,
            desc,
        });

        newMechanic.save();

        return res.status(201).json(
            new ApiResponse(201, newMechanic, 'Mechanic created successfully')
        );
    } catch (error) {
        if (error instanceof ApiError) throw error;
            throw new ApiError(400, 'Error creating mechanic', [error]);
    }
});
const updateMechanic = asyncHandler(async (req, res) => {
    try {

        const mechanic = await Mechanic.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        if (!mechanic) {
            throw new ApiError(404, 'Mechanic not found');
        }

        return res.status(200).json(
            new ApiResponse(200, mechanic, 'Mechanic updated successfully')
        );
    } catch (error) {
        if (error instanceof ApiError) throw error;
            throw new ApiError(400, 'Error updating mechanic', [error]);
    }
});

const getAllMechanics = asyncHandler(async (req, res) => {
    try {
        const mechanics = await Mechanic.find();
        if (!mechanics || mechanics.length === 0) {
            throw new ApiError(404, 'No mechanics found');
        }

        return res.status(200).json(
            new ApiResponse(200, mechanics, 'Mechanics retrieved successfully')
        );
    } catch (error) {
        if (error instanceof ApiError) throw error;
            throw new ApiError(400, 'Error retrieving mechanics', [error]);
    }
});

const getMechanicById = asyncHandler(async (req, res) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic) {
            throw new ApiError(404, 'Mechanic not found');
        }

        return res.status(200).json(
            new ApiResponse(200, mechanic, 'Mechanic retrieved successfully')
        );
    } catch (error) {
        if (error instanceof ApiError) throw error;
            throw new ApiError(400, 'Error retrieving mechanic', [error]);
    }
});

const updateMechanicStatus = asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;
        const mechanic = await Mechanic.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!mechanic) {
            throw new ApiError(404, 'Mechanic not found');
        }

        return res.status(200).json(
            new ApiResponse(200, mechanic, 'Mechanic status updated successfully')
        );
    } catch (error) {
        if (error instanceof ApiError) throw error;
            throw new ApiError(400, 'Error updating mechanic status', [error]);
    }
});

const getMechanicsStats = asyncHandler(async (req, res) => {
    try {
        const stats = await Mechanic.aggregate([
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                },
            },
        ]);

        return res.status(200).json(
            new ApiResponse(200, stats, 'Mechanics stats retrieved successfully')
        );
    } catch (error) {
        if (error instanceof ApiError) throw error;
            throw new ApiError(400, 'Error retrieving mechanics stats', [error]);
    }
});  


export {
    createMechanic,
    updateMechanic,
    getAllMechanics,
    getMechanicById,
    updateMechanicStatus,
    getMechanicsStats
};