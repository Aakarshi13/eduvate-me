import { Router } from 'express';
import { getAllScholarships, getScholarshipById } from '../controllers/scholarshipsController';

const router = Router();

router.get('/', getAllScholarships);
router.get('/:id', getScholarshipById);

export default router;
