import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';
import { ButtonComponent, Gap } from '../../atoms';
import DarkProfile from './DarkProfile';
import DashboardProfile from './DashboardProfile';

function Header({
  onPress, title, type, photo, desc,
}) {
  console.log('Header rerender');
  if (type === 'dark-profile') {
    return <DarkProfile onPress={onPress} title={title} desc={desc} photo={photo} />;
  }

  if (type === 'dashboard-profile') {
    return <DashboardProfile onPress={onPress} title={title} photo={photo} />;
  }
  return (
    <View style={styles.container(type)}>
      <ButtonComponent
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
}

export default memo(Header);

const styles = StyleSheet.create({
  text: (type) => ({
    fontSize: 20,
    color: type === 'dark' ? colors.text.primary : colors.text.tertiary,
    textAlign: 'center',
    flex: 1,
    textTransform: 'capitalize',
    fontFamily: fonts.secondary.pokemonStyle2,
    textShadowColor: colors.shadowText,
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 5 },
  }),

  container: (type) => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: type === 'dark' ? colors.secondary : colors.background.primary,
    flexDirection: 'row',
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
  }),
});
