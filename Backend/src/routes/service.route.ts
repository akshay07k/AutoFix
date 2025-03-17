import { Router } from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';

const router = Router();


router.get('/', getAllServices);
router.get('/:id', getServiceById);

// For Admin
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;