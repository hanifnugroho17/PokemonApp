import axios from 'axios';
import { databaseRef, GET_POKEMON_API } from '../../config';
import {
  GET_DISABLE_CATCH,
  GET_POKEMON_DETAIL_FAILURE, GET_POKEMON_DETAIL_LOADING, GET_POKEMON_DETAIL_SUCCESS,
} from '../types';

export const getDetailSuccess = (data) => ({
  type: GET_POKEMON_DETAIL_SUCCESS,
  data,
});

export const getDetailFailure = (error) => ({
  type: GET_POKEMON_DETAIL_FAILURE,
  error,
});

export const getDetailLoading = (loading) => ({
  type: GET_POKEMON_DETAIL_LOADING,
  loading,
});

export const getDisableCatch = (isDisable) => ({
  type: GET_DISABLE_CATCH,
  isDisable,
});

export const getDetail = (id, uid) => async (dispatch) => {
  dispatch(getDetailLoading(true));
  await axios.get(`${GET_POKEMON_API}/${id}`).then(
    async (res) => {
      if (res.data) {
        const checkPokemon = async (item) => {
          let keyFirebase = [];
          keyFirebase = Object.keys(item);
          for (let i = 0; i < keyFirebase?.length; i += 1) {
            if (item[keyFirebase[i]]?.id === res.data.id) {
              dispatch(getDisableCatch(true));
              return;
            }
            dispatch(getDisableCatch(false));
          }
        };

        databaseRef().ref(`/pokeBag/${uid}`).on('value', async (snapshot) => {
          if (snapshot.val()) {
            await checkPokemon(snapshot.val());
          }
        });

        const data = {
          ...res.data,
          type: res.data.types[0].type.name,
          name: res.data.name[0].toUpperCase() + res.data.name.substring(1),
        };
        dispatch(getDetailSuccess(data));
      }
    },
  ).catch(
    (error) => {
      dispatch(getDetailFailure(error));
      dispatch(getDetailLoading(false));
    },
  );
};
