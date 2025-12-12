import { Router } from 'express';
import { VehicleController } from '../controllers/vehicle.controller';

const router = Router();

router.get('/', VehicleController.getAll);
router.post('/', VehicleController.create);

export default router;