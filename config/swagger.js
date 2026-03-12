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
        },
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
                name: { type: 'string', example: 'John Doe' },
              },
            },
            likes: {
              type: 'array',
              items: { type: 'string' },
              example: ['user123', 'user456'],
            },
            createdAt: { type: 'string', format: 'date-time' },
          },
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
                name: { type: 'string', example: 'Jane Smith' },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        NewsApi: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Nouvelles avancées en santé mentale' },
            description: { type: 'string', example: 'Description de l\'article...' },
            url: { type: 'string', example: 'https://example.com/article' },
            publishedAt: { type: 'string', format: 'date-time' },
          },
        },
        ChatResponse: {
          type: 'object',
          properties: {
            text: { type: 'string', example: 'La santé mentale fait référence à...' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

export default swaggerOptions;
