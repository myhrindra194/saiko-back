import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/:idPost', addComment);
router.get('/:idPost', getComments);

export default router;