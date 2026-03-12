export const getMentalHealthNews = async () => {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        throw new Error('NEWS_API_KEY is not defined');
    }

    const query = encodeURIComponent('mental health');
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`NewsAPI error: ${response.status} - ${text}`);
    }

    return await response.json();
};