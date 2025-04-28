import { Account, Client } from 'node-appwrite';

export default async (req, res, next) => {
  try {
    // 1. Récupération du token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentification requise' });
    }
    
    const sessionToken = authHeader.split(' ')[1];

    // 2. Configuration client Appwrite
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setSession(sessionToken);

    // 3. Ajout d'une API Key si nécessaire
    if (process.env.APPWRITE_API_KEY) {
      client.setKey(process.env.APPWRITE_API_KEY);
    }

    // 4. Vérification de la session
    const account = new Account(client);
    try {
      const user = await account.get();
      
      req.user = {
        id: user.$id,
        name: user.name,
        email: user.email
      };
      
      next();
    } catch (error) {
      console.error('Détails erreur Appwrite:', error.response);
      return res.status(401).json({ 
        error: 'Session invalide',
        details: 'Veuillez vous reconnecter'
      });
    }
    
  } catch (error) {
    console.error('Erreur auth middleware:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};