import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconGoogle } from '../../../assets';
import { colors } from '../../../utils';

function Icons({ iconHeight, iconWidth, label }) {
  if (label === 'Google') return <IconGoogle height={iconHeight} width={iconWidth} />;
  if (label === 'Biometric') return <Icon name="fingerprint" size={25} color={colors.background.secondary} />;
  if (label === 'Facebook') return <Icon name="facebook" size={25} color={colors.background.secondary} />;
  return <Icon name="fingerprint" size={30} />;
}
function IconButton({
  onPress, nonButton, iconHeight, iconWidth, label,
}) {
  return (
    <View>
      {nonButton ? (
        <View style={styles.iconNonButton}>
          <View style={styles.icon}>
            <Icons iconHeight={iconHeight} iconWidth={iconWidth} label={label} />
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.iconWrapper} onPress={onPress}>
          <View style={styles.icon}>
            <Icons iconHeight={iconHeight} iconWidth={iconWidth} label={label} />
          </View>
        </TouchableOpacity>
      )}
    </View>

  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 55 / 5,
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    elevation: 6,
  },
  icon: {
    padding: 16,
    alignSelf: 'center',
    borderRadius: 8,
  },
  iconNonButton: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: colors.background.icon,
    opacity: 0.8,
    justifyContent: 'center',
  },

});
