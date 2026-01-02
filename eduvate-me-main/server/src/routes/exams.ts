import { Router } from 'express';
import { getAllExams, getExamById } from '../controllers/examsController';

const router = Router();

router.get('/', getAllExams);
router.get('/:id', getExamById);

export default router;
