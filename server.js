import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db.js';
import commentRoutes from './routes/commentRoutes.js';
import postRoutes from './routes/postRoutes.js';
import newsRoute from './routes/newsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Saiko API',
      version: '1.0.0',
      description: 'API pour la plateforme Saiko',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        Post: {
          type: 'object',
          properties: {
            idPost: { type: 'integer', example: 1 },
            content: { type: 'string', example: 'Contenu du post' },
            isAnonymous: { type: 'boolean', example: false },
            author: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'user123' },
                name: { type: 'string', example: 'John Doe' }
              }
            },
            likes: { 
              type: 'array',
              items: { type: 'string' },
              example: ['user123', 'user456']
            },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Comment: {
          type: 'object',
          properties: {
            commentId: { type: 'integer', example: 1 },
            content: { type: 'string', example: 'Super post !' },
            isAnonymous: { type: 'boolean', example: 'true' },
            author: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'user789' },
                name: { type: 'string', example: 'Jane Smith' }
              }
            },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewsApi: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Nouvelles avancées en santé mentale' },
            description: { type: 'string', example: 'Description de l\'article...' },
            url: { type: 'string', example: 'https://example.com/article' },
            publishedAt: { type: 'string', format: 'date-time' }
          }
        },
        ChatResponse: {
          type: 'object',
          properties: {
            text: { type: 'string', example: 'La santé mentale fait référence à...' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

connectDB();

app.use('/api/news', newsRoute);
app.use('/api/chat', aiRoutes);

app.use('/posts', postRoutes);
app.use('/posts', commentRoutes);



app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trouvé' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});