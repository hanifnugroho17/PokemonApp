import React, { memo } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { colors, fonts } from '../../../utils';

import IconButton from './IconButton';
import IconOnly from './IconOnly';
import FloatingButton from './FloatingButton';

function ButtonComponent({
  type, title, onPress, icon, disable, nonButton, iconHeight, iconWidth, label, style,
}) {
  console.log('Button component rerender');

  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }

  if (type === 'icon-button') {
    return (
      <IconButton
        onPress={onPress}
        nonButton={nonButton}
        iconHeight={iconHeight}
        iconWidth={iconWidth}
        label={label}
      />
    );
  }
  if (type === 'floating-btn') {
    return <FloatingButton icon={icon} onPress={onPress} />;
  }

  if (disable) {
    return (
      <View style={{ ...styles.disableBG, ...style }}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={{ ...styles.container(type), ...style }} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
}

export default memo(ButtonComponent);

const styles = StyleSheet.create({
  container: (type) => ({
    backgroundColor:
      type === 'secondary' ? colors.button.secondary.background : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
  }),
  disableBG: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.disable.background,
  },
  disableText: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.disable.text,
    textAlign: 'center',
  },
  text: (type) => ({
    fontSize: 16,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: type === 'secondary' ? colors.button.secondary.text : colors.button.primary.text,
  }),
});
