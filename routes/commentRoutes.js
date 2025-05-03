import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Gestion des commentaires
 */

router.use(authMiddleware);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Ajouter un commentaire à une publication
 *     tags: [Comments]
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
 *             required:
 *               - content
 *               - isAnonymous
 *     responses:
 *       201:
 *         description: Commentaire ajouté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Publication non trouvée
 */
router.post('/:postId/comments', addComment);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Récupérer les commentaires d'une publication
 *     tags: [Comments]
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
 *         description: Liste des commentaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Publication non trouvée
 */
router.get('/:postId/comments', getComments);

export default router;