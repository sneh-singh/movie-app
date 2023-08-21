import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants';

export const useList = async ({ setIsLoading = () => {}, setIsError = () => {}, setMovies = () => {} }) => {
    setIsLoading(true);
    setIsError(false);
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY,
        },
        });
        setMovies(response.data.results);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error('Error fetching popular movies:', error);
    }
}

export const useHandleSearch = async ({ searchQuery, setIsLoading = () => {}, setIsError = () => {}, setMovies = () => {} }) => {
    setIsLoading(true);
    setIsError(false);
    if (searchQuery) {
      try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            query: searchQuery,
          },
        });
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error('Error searching for movies:', error);
      }
    } else {
        useList();
    }
  };