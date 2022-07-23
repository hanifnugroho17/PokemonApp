import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { pikachu } from '../../assets';
import {
  colors, fonts, onLogScreenView, windowHeight, windowWidth,
} from '../../utils';

function SplashScreen({ navigation }) {
  useEffect(() => {
    onLogScreenView('SplashScreen');

    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setTimeout(() => {
          navigation.replace('DashboardPokemonScreen');
        }, 3000);
      } else {
        setTimeout(() => {
          navigation.replace('LoginScreen');
        }, 3000);
      }
    });

    return subscriber;
  }, [navigation]);
  return (
    <View style={styles.page}>
      <LottieView source={pikachu} autoPlay loop style={styles.image} />
      <Text style={styles.title}>My Pokemon</Text>
      <Text style={styles.nickname}>Hanif Nugroho Jati</Text>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background.secondary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.text.tertiary,
    fontFamily: fonts.secondary.pokemonStyle2,
    textShadowColor: colors.shadowText,
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 5 },
    marginTop: -50,
  },

  image: {
    height: windowHeight * 0.27,
    width: windowWidth * 0.4,
  },

  nickname: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: fonts.primary[800],
    position: 'absolute',
    bottom: 19,
  },
});
