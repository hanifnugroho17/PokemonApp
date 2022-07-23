const mainColors = {
  black1: '#112340',
  black2: 'rgba(0, 0, 0, 0.5)',
  grey1: '#7D8797',
  grey2: '#B1B7C2',
  grey3: '#E9E9E9',
  grey4: '#EDEEF0',
  grey5: '#B1B7C2',
  dark1: '#112340',
  dark2: '#495A75',
  red1: '#E06379',
  orange1: '#00a65e',
  yellow1: '#ffcb05',
  blue1: '#2a75bb',
};
export const pokemonColors = {
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  fire: '#FA6C6C',
  water: '#6890F0',
  grass: '#48CFB2',
  electric: '#FFCE4B',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
};

export const colors = {
  warning: mainColors.red1,
  primary: 'white',
  secondary: mainColors.orange1,
  background: {
    primary: 'white',
    secondary: mainColors.orange1,
    black: mainColors.black1,
  },
  button: {
    primary: {
      background: mainColors.orange1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColors.black1,
    },
  },

  text: {
    primary: mainColors.black1,
    secondary: 'white',
    subtitle: mainColors.grey1,
    tertiary: mainColors.yellow1,
  },

  disable: {
    background: mainColors.grey4,
    text: mainColors.grey5,
  },

  lineTextInput: mainColors.orange1,
  loadingBackground: mainColors.black2,
  menuInactive: mainColors.dark2,
  menuActive: mainColors.blue1,
  outlineInput: mainColors.grey2,
  border: mainColors.grey3,
  shadowText: mainColors.blue1,
};
