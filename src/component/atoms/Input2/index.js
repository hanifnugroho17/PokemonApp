import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors, fonts } from '../../../utils';

function Input2({
  onChangeText, value, label, onBlur, cannotEdited, secureTextEntry, leftIcon,
}) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        label={label}
        onBlur={onBlur}
        mode="outlined"
        activeOutlineColor={colors.lineTextInput}
        outlineColor={cannotEdited ? colors.disable.background : colors.outlineInput}
        style={styles.input}
        secureTextEntry={secureTextEntry ? passwordVisible : false}
        left={(
          <TextInput.Icon name={leftIcon} />
            )}
        right={secureTextEntry ? (
          <TextInput.Icon
            name={passwordVisible ? 'eye' : 'eye-off'}
            onPress={() => setPasswordVisible(!passwordVisible)}
            color={passwordVisible ? colors.background.black : colors.warning}
          />
        ) : null}

      />
    </View>
  );
}

export default memo(Input2);

const styles = StyleSheet.create({
  input: {
    fontFamily: fonts.primary[600],
    fontSize: 14,
    color: colors.text.secondary,
  },
});
