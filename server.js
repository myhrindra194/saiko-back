import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swagger.js';
import connectDB from './config/db.js';
import commentRoutes from './routes/commentRoutes.js';
import postRoutes from './routes/postRoutes.js';
import newsRoute from './routes/newsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const specs = swaggerJsdoc(swaggerOptions);

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || '*' }));
app.use(compression());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes, réessayez plus tard.',
});
app.use(limiter);

app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

connectDB();

app.use('/api/news', newsRoute);
app.use('/api/chat', aiRoutes);

app.use(['/posts','/api/posts'], postRoutes);
app.use(['/posts','/api/posts'], commentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trouvé', path: req.path });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});