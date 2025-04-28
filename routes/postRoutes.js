import express from 'express';
import { createPost, deletePost, getPosts } from '../controllers/postController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createPost);
router.get('/', getPosts);
router.delete('/:idPost', deletePost);

export default router;