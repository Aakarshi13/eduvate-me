import { Router } from 'express';
import { getPlacementStats, getCollegePlacements } from '../controllers/placementsController';

const router = Router();

router.get('/stats', getPlacementStats);
router.get('/college/:collegeId', getCollegePlacements);

export default router;
