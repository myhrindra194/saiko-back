import { createClient } from '@supabase/supabase-js';

// server-side middleware to verify Supabase JWT tokens
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentification requise' });
    }

    const token = authHeader.split(' ')[1];

    const { data, error } = await supabase.auth.getUser(token);
    const user = data?.user;
    if (error || !user) {
      console.error('Supabase auth error:', error);
      return res.status(401).json({
        error: 'Session invalide',
        details: 'Veuillez vous reconnecter'
      });
    }

    req.user = {
      id: user.id,
      name: user.user_metadata?.full_name || user.user_metadata?.name || '',
      email: user.email
    };

    next();
  } catch (error) {
    console.error('Erreur auth middleware:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};