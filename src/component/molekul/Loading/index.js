import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { loadingGlobal } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function Loading() {
  return (
    <View style={styles.wrapper}>
      <LottieView source={loadingGlobal} autoPlay loop />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: colors.loadingBackground,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.primary,
    marginTop: 12,
  },
});
