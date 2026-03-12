import { getMentalHealthNews } from '../services/newsService.js';

export const getNews = async (req, res, next) => {
    const data = await getMentalHealthNews();
    res.status(200).json(data);
};