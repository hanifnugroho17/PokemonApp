import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { colors } from '../../../utils';

function FloatingButton({ onPress, icon }) {
  console.log('floating button');
  return (
    <FAB
      style={styles.fab}
      icon={icon}
      onPress={onPress}
    />
  );
}

export default memo(FloatingButton);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 50,
    backgroundColor: colors.background.secondary,
  },
});
