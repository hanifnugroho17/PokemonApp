import { GET_POKEMON_FAILURE, GET_POKEMON_LOADING, GET_POKEMON_SUCCESS } from '../types';

const initialPokemonState = {
  pokemon: [],
  loading: true,
  error: null,
  pagination: {},
};

export const pokemonReducer = (state = initialPokemonState, action = {}) => {
  switch (action.type) {
    case GET_POKEMON_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case GET_POKEMON_SUCCESS:
      return {
        ...state,
        pokemon: action.pokemon,
        loading: action.loading,
        pagination: action.pagination,
      };
    case GET_POKEMON_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    default:
      return state;
  }
};
