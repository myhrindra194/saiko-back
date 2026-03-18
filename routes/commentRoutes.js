import express from 'express';
import { addComment, deleteComment, getCommentById, getComments } from '../controllers/commentController.js';
import authMiddleware from '../middlewares/auth.js';
import asyncHandler from '../utils/asyncHandler.js';

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
router.post('/:postId/comments', asyncHandler(addComment));

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
router.get('/:postId/comments', asyncHandler(getComments));

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   get:
 *     summary: Récupérer un commentaire par son ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Commentaire trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Commentaire non trouvé
 */
router.get('/:postId/comments/:commentId', asyncHandler(getCommentById));

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Commentaire supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.delete('/:postId/comments/:commentId', asyncHandler(deleteComment));

export default router;