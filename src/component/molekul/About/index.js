import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';

export default function About(props) {
  const { item } = props;
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    function getAbility() {
      const arr = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < item?.abilities?.length; i++) {
        arr.push(item?.abilities[i].ability.name);
      }
      return setAbilities(arr);
    }

    getAbility();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Text style={styles.about__title}>Species</Text>
        <Text style={styles.about__text}>{item?.species?.name}</Text>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Text style={styles.about__title}>Height</Text>
        <Text style={styles.about__text}>
          {item?.height}

        </Text>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Text style={styles.about__title}>Weight</Text>
        <Text style={styles.about__text}>
          {item?.weight}
          lbs
        </Text>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Text style={styles.about__title}>Abilities</Text>
        <Text style={styles.about__text}>{abilities?.join(', ')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  about__title: {
    fontSize: 14,
    fontFamily: fonts.primary[800],
    marginLeft: 30,
    color: colors.lineTextInput,
    opacity: 0.7,
    width: 120,
  },
  about__text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary[800],
    color: colors.text.subtitle,
  },
});
