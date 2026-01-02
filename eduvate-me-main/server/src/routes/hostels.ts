import { Router } from 'express';
import { getAllHostels, getHostelById } from '../controllers/hostelsController';

const router = Router();

router.get('/', getAllHostels);
router.get('/:id', getHostelById);

export default router;
