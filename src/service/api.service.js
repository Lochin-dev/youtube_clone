import axios from "axios";

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    params: {
        maxResults: '52'
    },
    headers: {
        'X-RapidAPI-Key': '12cb8b44ccmshfe892d61f932862p17e0f8jsnb9a76f0c2f45',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const ApiServise = {
    async fetching(url) {
        const response = await axios.get(`${BASE_URL}/${url}`, options)
        return response.data
    }
}