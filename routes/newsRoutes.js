import express from 'express';
import { getNews } from '../controllers/newsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Endpoints pour les actualités sur la santé mentale
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Récupère les actualités sur la santé mentale
 *     description: Récupère une liste d'articles d'actualité liés à la santé mentale.
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des actualités
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Nouvelles avancées en santé mentale"
 *                   description:
 *                     type: string
 *                     example: "Description de l'article..."
 *                   url:
 *                     type: string
 *                     example: "https://example.com/article"
 *                   publishedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la récupération des articles"
 */
router.get('/', getNews);

export default router;