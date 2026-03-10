import express from 'express';
import { askChatbot } from '../controllers/aiController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: Endpoints pour l'intelligence artificielle et le chatbot
 */

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Pose une question au chatbot IA
 *     description: Envoie un prompt au chatbot et reçoit une réponse générée par IA.
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: Le prompt à envoyer au chatbot
 *                 example: "Qu'est-ce que la santé mentale ?"
 *     responses:
 *       200:
 *         description: Réponse du chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   example: "La santé mentale fait référence à..."
 *       400:
 *         description: Prompt manquant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Prompt requis"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "L'IA est indisponible pour le moment."
 */
router.post('/', askChatbot);

export default router;