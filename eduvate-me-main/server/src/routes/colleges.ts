import { Router } from 'express';
import { getAllColleges, getCollegeById, predictColleges, predictCollegesFromMockScore } from '../controllers/collegesController';

const router = Router();

router.get('/', getAllColleges);
router.get('/:id', getCollegeById);
router.post('/predict', predictColleges);
router.post('/predict/mock', predictCollegesFromMockScore);

export default router;
