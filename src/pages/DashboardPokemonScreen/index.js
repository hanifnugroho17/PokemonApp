import LottieView from 'lottie-react-native';
import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import {
  FlatList, StatusBar, StyleSheet, Text, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILNullPhoto, pikachu } from '../../assets';
import {
  ButtonComponent, Footer, Header, PokemonCard,
} from '../../component';
import { GET_POKEMON_API, signOut } from '../../config';
import { getPokemon } from '../../redux';
import {
  colors, fonts, getData, onLogScreenView, removeData, showError, windowHeight, windowWidth,
} from '../../utils';

function DashboardPokemonScreen({ navigation }) {
  const dispatch = useDispatch();
  const dataPokemon = useSelector((state) => state.dataPokemon);
  const loading = useSelector((state) => state.dataPokemon.loading);
  const pagination = useSelector((state) => state.dataPokemon.pagination);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
    uid: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const onHandleNext = () => {
    setCurrentPage(currentPage + 1);
    dispatch(getPokemon(pagination.next));
  };

  const onHandlePrevious = () => {
    setCurrentPage(currentPage - 1);
    dispatch(getPokemon(pagination.previous));
  };

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
    });
  };
  

  const logOut = useCallback(() => {
    signOut().then(() => {
      removeData('user').then(() => navigation.replace('LoginScreen'));
    })
      .catch((err) => {
        showError(err.message);
      });
  }, [navigation]);

  const goToPokebag = useCallback(() => {
    navigation.navigate('PokebagScreen', { uid: profile.uid });
  }, [navigation, profile.uid]);

  useEffect(() => {
    onLogScreenView('DashboardScreen');
    getUserData();
    dispatch(getPokemon(`${GET_POKEMON_API}?offset=${0}&limit=${20}`));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background.primary} barStyle="dark-content" />
      <Header type="dashboard-profile" title="My Pokemon" onPress={logOut} />

      {
          loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LottieView source={pikachu} autoPlay loop style={styles.image} />
              <Text style={styles.title}>Loading...</Text>
            </View>
          ) : (
            <FlatList
              data={dataPokemon.pokemon}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(pokemon) => String(pokemon.id)}
              renderItem={({ item }) => <PokemonCard pokemon={item} onPress={() => navigation.navigate('PokemonDetailScreen', { id: item.id, uid: profile.uid })} />}
              // eslint-disable-next-line react/no-unstable-nested-components
              ListFooterComponent={({ item }) => (
                <Footer
                  dataPokemon={item}
                  onHandleNext={onHandleNext}
                  onHandlePrevious={onHandlePrevious}
                  currentPage={currentPage}
                />
              )}
            />
          )
        }

      <ButtonComponent icon="bag-personal" type="floating-btn" onPress={goToPokebag} />
    </View>
  );
}

export default memo(DashboardPokemonScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  image: {
    height: windowHeight * 0.17,
    width: windowWidth * 0.3,
    alignSelf: 'center',
  },

  title: {
    fontSize: 12,
    color: colors.text.tertiary,
    fontFamily: fonts.secondary.pokemonStyle2,
    textShadowColor: colors.shadowText,
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 5 },
    marginTop: -30,
  },

});
