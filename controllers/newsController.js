import { getMentalHealthNews } from '../services/newsService.js';

export const getNews = async (req, res) => {
    try {
        const data = await getMentalHealthNews();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erreur dans le contrôleur News:", error);
        res.status(500).json({ 
            success: false, 
            message: "Erreur lors de la récupération des articles" 
        });
    }
};