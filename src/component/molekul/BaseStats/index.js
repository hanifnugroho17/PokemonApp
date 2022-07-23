import React from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { colors, fonts } from '../../../utils';

export default function BaseStats(props) {
  const { item } = props;
  return (
    <ScrollView>
      {
                item.stats.map((stat, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <View key={idx} style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={styles.stats__title}>
                      {stat.stat.name[0]
                        .toUpperCase() + stat.stat.name.substring(1)}

                    </Text>
                    <Text style={styles.stats__text}>{stat.base_stat}</Text>
                    <View style={{ width: 130, alignContent: 'center', paddingTop: 10 }}>
                      <ProgressBar progress={stat.base_stat / 100} color={colors.lineTextInput} />
                    </View>
                  </View>

                ))
            }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stats__title: {
    fontSize: 14,
    fontFamily: fonts.primary[800],
    marginLeft: 30,
    color: colors.text.subtitle,
    width: 120,
  },
  stats__text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary[800],
    color: colors.text.subtitle,
    width: 80,
  },

});
