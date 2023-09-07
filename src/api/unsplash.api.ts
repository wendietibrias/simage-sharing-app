import axios from 'axios';

export const getAllUnplashPhotos = async (page : number) => {
    const { data } = await axios.get(`https://api.unsplash.com/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&page=${page}&per_page=${15}`);
    return data;
}