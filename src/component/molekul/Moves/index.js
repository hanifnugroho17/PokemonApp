import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { colors, fonts, pokemonColors } from '../../../utils';

export default function Moves(props) {
  const { item } = props;

  const pokemonColor = pokemonColors[item.types['0'].type.name];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        {item.moves.map((move, idx) => (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            style={{
              backgroundColor: pokemonColor, borderRadius: 5, alignSelf: 'baseline', margin: 5, opacity: 0.5,
            }}
          >
            <Text style={{
              color: colors.text.primary,
              padding: 5,
              fontFamily: fonts.primary[600],
            }}
            >
              {move.move.name}

            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
