import {Router} from 'express';
import { getAllCourses, getLecturesByCourseId } from '../controllers/courseController.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

const router= Router();

router.get('/', getAllCourses);
router.get('/:id', isLoggedIn, getLecturesByCourseId);

export default router;