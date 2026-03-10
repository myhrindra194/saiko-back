export const getMentalHealthNews = async () => {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q="mental health"&apiKey=${apiKey}`;

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status}`);
    }

    return await response.json();
};