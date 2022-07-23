import axios from 'axios';
import { GET_POKEMON_FAILURE, GET_POKEMON_LOADING, GET_POKEMON_SUCCESS } from '../types';

export const getPokemonSuccess = (pokemon, pagination) => ({
  type: GET_POKEMON_SUCCESS,
  pokemon,
  pagination,
});

export const getPokemonFailure = (error) => ({
  type: GET_POKEMON_FAILURE,
  error,
});

export const getPokemonLoading = (loading) => ({
  type: GET_POKEMON_LOADING,
  loading,
});

export const getPokemon = (url) => async (dispatch) => {
  dispatch(getPokemonLoading(true));
  await axios.get(url).then(
    async (res) => {
      const result = await res.data.results;

      const resultPagination = {
        next: res.data.next,
        previous: res.data.previous,
      };

      const pokemonArray = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const pokemon of result) {
        const pokemonDetailsResponse = await axios.get(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.data;

        pokemonArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1),
          type: pokemonDetails.types[0].type.name,
          types: pokemonDetails.types,
          imgUrl: pokemonDetails.sprites.other['official-artwork'].front_default,
        });
      }

      dispatch(getPokemonSuccess(pokemonArray, resultPagination));
    },
  ).catch(
    (error) => {
      dispatch(getPokemonFailure(error));
      dispatch(getPokemonLoading(false));
    },
  );
};
