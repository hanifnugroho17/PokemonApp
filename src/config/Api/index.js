export const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

// GET_API
export const GET_POKEMON_API = getApiUrl('/pokemon');