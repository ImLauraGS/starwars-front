import axios from "axios";

axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";

export const starshipsApi = () => {
    const baseUrl = "https://swapi.dev/api/starships";

    const getAll = async (page = 1) => {
        const response = await axios.get(`${baseUrl}/?page=${page}`);
        return response;
    };

    const getOne = async (id) => {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response;
    };

    return {
        getAll,
        getOne
    };
};

export const starshipsImgApi = () => {
    const baseUrl = "https://starwars-visualguide.com/assets/img/starships";

    const checkImageExists = async (url) => {
        try {
            await axios.head(url);
            return true;
        } catch {
            return false;
        }
    };

    const getOne = async (id) => {
        const imageUrl = `${baseUrl}/${id}.jpg`;
        const exists = await checkImageExists(imageUrl);
        return exists ? imageUrl : '/big-placeholder.jpg';
    };

    return {
        getOne
    };
}

export const peopleApi = () => {
    const baseUrl = "https://swapi.dev/api/people";

    const getPilot = async (url) => {
        const response = await axios.get(url);
        return response;
    };

    return {
        getPilot
    };
};

export const filmsApi = () => {
    const baseUrl = "https://swapi.dev/api/films";

    const getFilm = async (url) => {
        const response = await axios.get(url);
        return response;
    };

    return {
        getFilm
    };
};