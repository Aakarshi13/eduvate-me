import { Router } from 'express';
import { getAllColleges, getCollegeById, predictColleges } from '../controllers/collegesController';

const router = Router();

router.get('/', getAllColleges);
router.get('/:id', getCollegeById);
router.post('/predict', predictColleges);

export default router;
