import express from 'express';
import {
    createMechanic,
    updateMechanic,
    getAllMechanics,
    getMechanicById,
    updateMechanicStatus,
    getMechanicsStats
} from '../controllers/mechanic.controller.js';

const router = express.Router();

router.get('/stats', getMechanicsStats);
router.post('/createMechanic', createMechanic);
router.get('/getAllMechanics', getAllMechanics);
router.get('/getMechanicById/:id', getMechanicById);
router.put('/updateMechanic/:id', updateMechanic);
router.put('/updateMechanicStatus/:id', updateMechanicStatus);

export default router;