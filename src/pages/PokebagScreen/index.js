import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList, Modal, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { Header, Loading, PokemonCard } from '../../component';
import { databaseRef } from '../../config/Firebase';
import { colors, fonts, showError } from '../../utils';

function PokebagScreen({ navigation, route }) {
  const { uid } = route.params;
  const [pokebag, setPokebag] = useState([]);
  const [key, setKey] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const fetchPokeBagData = async () => {
    setLoading(true);
    const reference = databaseRef().ref(`/pokeBag/${uid}`);
    reference.on('value', (snapshot) => {
      if (snapshot.val()) {
        GetData(snapshot.val());
        setLoading(false);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPokeBagData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetData = (data) => {
    let keyFirebase = [];
    keyFirebase = Object.keys(data);
    setKey(keyFirebase);
    setPokebag(data);
  };

  const removePokemon = async () => {
    try {
      await databaseRef().ref(`/pokeBag/${uid}/${id}`).remove();
      fetchPokeBagData();
      setModalVisible(false);
    } catch (error) {
      showError(error);
    }
  };

  const detailPokemon = useCallback(() => {
    navigation.navigate('PokemonDetailScreen', {
      id: pokebag[id].id,
      uid,
    });
    setModalVisible(false);
  }, [id, navigation, pokebag, uid]);

  const openModal = (item) => {
    setId(item);
    setModalVisible(true);
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return loading ? <Loading /> : (
    <View style={styles.pages}>
      <Header title="Your Pokemon" onPress={goBack} />
      {
        pokebag.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You don&apos;t have any pokemon yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={key}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PokemonCard
                pokemon={pokebag[item]}
                onPress={() => openModal(item)}
              />
            )}
          />
        )
      }

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.containerModal}>
          <View style={styles.containerTop}>
            <IconButton
              icon="cancel"
              style={{ position: 'absolute', right: 0 }}
              color={colors.warning}
              onPress={() => setModalVisible(false)}
            />
            <Text style={{
              fontSize: 16,
              textAlign: 'center',
              paddingTop: 50,
              fontFamily: fonts.primary[800],
              color: colors.text.subtitle,
            }}
            >
              Go to detail or remove pokemon
              {' '}
              {pokebag[id]?.name}
              ?
            </Text>
            <View style={{ flexDirection: 'row', margin: 10 }}>
              <TouchableOpacity onPress={() => detailPokemon()} style={styles.cancelButton}>
                <Text style={{ fontSize: 14, color: colors.text.secondary }}>Detail</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removePokemon()} style={styles.deleteButton}>
                <Text style={{ fontSize: 14, color: colors.text.secondary }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>

  );
}

export default PokebagScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  containerModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerTop: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingBottom: 20,
    alignItems: 'center',
    height: 200,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 5,
    width: '40%',
    borderColor: colors.background.secondary,
    backgroundColor: colors.background.secondary,
    height: 40,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 5,
    width: '40%',
    borderColor: colors.warning,
    backgroundColor: colors.warning,
    height: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 50,
    fontFamily: fonts.primary[800],
    color: colors.text.subtitle,
  },

});
