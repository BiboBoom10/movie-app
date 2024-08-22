import { API_KEY } from '@env';
import axios from 'axios';

// https://developer.themoviedb.org/reference/search-movie

const apiBaseUrl = 'https://api.themoviedb.org/3';

const trendingMovies = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;

const upcomingMovies = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;

const topRatedMovies = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;

const movieDetails = id => `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;

const movieCredits = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;

const similarMovies = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

const personDetails = id => `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;

const personMovies = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

const searchMovie = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`

export const image500 = path => path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.techtarget.com%2Fwhatis%2Fdefinition%2F404-status-code&psig=AOvVaw0Ak3LN6Bbxcikb3vkQ1M8a&ust=1724228526580000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDUn4GSg4gDFQAAAAAdAAAAABAJ';
export const fallbackPersonImage = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbitslog.com%2F2013%2F01%2F23%2Fnew-bitcoin-vulnerability-get-your-peer-public-addresses%2F&psig=AOvVaw33ijjn2tVO3d_882sneywR&ust=1724228595795000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMinn5qSg4gDFQAAAAAdAAAAABAJ';

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error', error);
        return {};
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMovies);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMovies);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMovies);
}

export const fetchMovieDetails = (id) => {
    return apiCall(movieDetails(id));
}

export const fetchMovieCredits = (id) => {
    return apiCall(movieCredits(id));
}

export const fetchSimilarMovies = (id) => {
    return apiCall(similarMovies(id));
}

export const fetchPersonDetails = (id) => {
    return apiCall(personDetails(id));
}

export const fetchPersonMovies = (id) => {
    return apiCall(personMovies(id));
}

export const fetchSearchedMovie = (params) => {
    return apiCall(searchMovie, params)
}