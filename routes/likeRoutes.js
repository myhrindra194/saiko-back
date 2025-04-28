import express from 'express';
import { checkLike, toggleLike } from '../controllers/likeController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/:idPost/toggle', toggleLike);
router.get('/:idPost/check', checkLike);

export default router;