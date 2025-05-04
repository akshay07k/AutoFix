import Service from '../models/service.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await Service.find();
    
    return res.status(200).json(
        new ApiResponse(200, services, 'Services fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching services', [error]);
  }
});

const getServiceById = asyncHandler(async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      throw new ApiError(404, 'Service not found');
    }

    return res.status(200).json(
        new ApiResponse(200, service, 'Service fetched successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error fetching service', [error]);
  }
});

const createService = asyncHandler(async (req, res) => {
  try {
    const serviceData = req.body;
    const newService = new Service(serviceData);
    await newService.save();

    return res.status(201).json(
        new ApiResponse(201, newService, 'Service created successfully')
    );
  } catch (error) {
    throw new ApiError(400, 'Error creating service', [error]);
  }
});

const updateService = asyncHandler(async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedService) {
      throw new ApiError(404, 'Service not found');
    }

    return res.status(200).json(
        new ApiResponse(200, updatedService, 'Service updated successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, 'Error updating service', [error]);
  }
});

const deleteService = asyncHandler(async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      throw new ApiError(404, 'Service not found');
    }

    return res.status(200).json(
        new ApiResponse(200, null, 'Service deleted successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, 'Error deleting service', [error]);
  }
});


const getServicesByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category });
    if (!services) {
      throw new ApiError(404, 'No services found for this category');
    }
    return res.status(200).json(
        new ApiResponse(200, services, 'Services fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching services', [error]);
  }
});


export {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    getServicesByCategory
}