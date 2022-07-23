import React from 'react';
import {
  Image,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconApp2 } from '../../../assets';
import { colors, fonts } from '../../../utils';

function DashboardProfile({ title, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Image source={IconApp2} style={{ width: 30, height: 30 }} />
      </View>
      <TouchableOpacity onPress={onPress}>
        <Icon name="logout" size={25} />
      </TouchableOpacity>
    </View>
  );
}

export default DashboardProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,

  },
  content: {
    flex: 1,
    marginLeft: -5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },

  name: {
    fontSize: 23,
    color: colors.text.tertiary,
    fontFamily: fonts.secondary.pokemonStyle2,
    textShadowColor: colors.shadowText,
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 5 },
    marginTop: 4,
    textAlign: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

});
