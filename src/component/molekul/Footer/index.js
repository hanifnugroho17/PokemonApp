import React, { memo } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts } from '../../../utils';
import { ButtonComponent } from '../../atoms';

function Footer({
  dataPokemon, onHandleNext, onHandlePrevious, currentPage,
}) {
  console.log('Rerender Footer');
  return (
    <View style={styles.footerContent}>

      <ButtonComponent
        disable={currentPage === 1}
        title="Previously"
        onPress={() => onHandlePrevious()}
        style={styles.buttonPagination}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.textPagination}>{currentPage}</Text>
      </View>
      <ButtonComponent
        disabled={dataPokemon?.hasMore}
        onPress={() => onHandleNext()}
        style={styles.buttonPagination}
        title="Next"
      />
    </View>
  );
}

export default memo(Footer);

const styles = StyleSheet.create({
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  buttonPagination: {
    width: '30%',
  },

  textPagination: {
    fontSize: 20,
    fontFamily: fonts.secondary.pokemonStyle2,
    color: colors.text.tertiary,
    textAlign: 'center',

  },

});
