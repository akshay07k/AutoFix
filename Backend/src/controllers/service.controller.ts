import { Request, Response } from 'express';
import Service from '../models/service.model';
import { IServiceDoc } from '../types';
import { ApiError, ApiResponse, asyncHandler} from '../utils';

const getAllServices = asyncHandler(async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    
    return res.status(200).json(
        new ApiResponse(200, services, 'Services fetched successfully')
    );
  } catch (error) {
    throw new ApiError(500, 'Error fetching services', [error]);
  }
});

const getServiceById = asyncHandler(async (req: Request, res: Response) => {
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

const createService = asyncHandler(async (req: Request, res: Response) => {
  try {
    const serviceData: IServiceDoc = req.body;
    const newService = new Service(serviceData);
    await newService.save();

    return res.status(201).json(
        new ApiResponse(201, newService, 'Service created successfully')
    );
  } catch (error) {
    throw new ApiError(400, 'Error creating service', [error]);
  }
});

const updateService = asyncHandler(async (req: Request, res: Response) => {
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

const deleteService = asyncHandler(async (req: Request, res: Response) => {
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


export {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
}