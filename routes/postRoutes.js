import express from 'express';
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    toggleLike,
    updatePost
} from '../controllers/postController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gestion des publications
 */

router.use(authMiddleware);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Créer une nouvelle publication
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               isAnonymous:
 *                 type: boolean
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Publication créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/', createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupérer toutes les publications
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des publications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', getPosts);

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Récupérer une publication par son ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publication trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Publication non trouvée
 */
router.get('/:postId', getPostById);

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Mettre à jour une publication
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               isAnonymous:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Publication mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Publication non trouvée
 */
router.put('/:postId', updatePost);

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Supprimer une publication
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Publication supprimée
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Publication non trouvée
 */
router.delete('/:postId', deletePost);

/**
 * @swagger
 * /posts/{postId}/like:
 *   post:
 *     summary: Like/Dislike une publication
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Statut du like mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                 likesCount:
 *                   type: integer
 *       404:
 *         description: Publication non trouvée
 */
router.post('/:postId/like', toggleLike);

export default router;