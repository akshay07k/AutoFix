import { Router } from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServicesByCategory,
} from '../controllers/service.controller.js';

const router = Router();


router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.get('/category/:category', getServicesByCategory);

// For Admin
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;