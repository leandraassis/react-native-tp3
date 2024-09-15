import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { IconButton, Table, TopBar, Button, TextInput } from '@/components';
import { listarJogos, atualizarJogo, deletarJogo } from '@/services/database';
import { Game } from '@/interfaces/Game';
import { router } from 'expo-router';

export default function GamesScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedRating, setUpdatedRating] = useState('');

  useEffect(() => {
    const loadingGames = async () => {
      try {
        const games = await listarJogos();
        setGames(games);
      } catch (error) {
        console.error("Erro ao carregar jogos", error);
      } finally {
        setLoading(false);
      }
    };

    loadingGames();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deletarJogo(id);
      setGames(games.filter(game => game.id !== id));
    } catch (error) {
      console.error("Erro ao excluir jogo", error);
    }
  };

  const handleUpdate = async () => {
    if (currentGame) {
      try {
        await atualizarJogo({
          ...currentGame,
          name: updatedName || currentGame.name,
          price: parseFloat(updatedPrice) || currentGame.price,
          rating: parseFloat(updatedRating) || currentGame.rating,
        });
        setGames(games.map(game => (game.id === currentGame.id ? { ...currentGame, name: updatedName, price: parseFloat(updatedPrice), rating: parseFloat(updatedRating) } : game)));
        setModalVisible(false);
        setCurrentGame(null);
      } catch (error) {
        console.error("Erro ao atualizar jogo", error);
      }
    }
  };

  const openUpdateModal = (game: Game) => {
    setCurrentGame(game);
    setUpdatedName(game.name);
    setUpdatedPrice(game.price.toString());
    setUpdatedRating(game.rating.toString());
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const columns = [
    { title: 'Nome', accessor: (item: Game) => item.name, numeric: false },
    { title: 'Nota', accessor: (item: Game) => item.rating.toFixed(1), numeric: true },
    { title: 'Preço', accessor: (item: Game) => `R$ ${item.price.toFixed(2)}`, numeric: true },
    {
      accessor: (item: Game) => (
        <View style={styles.actions}>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => openUpdateModal(item)}
          />
          <IconButton
            icon="trash-can"
            size={20}
            onPress={() => handleDelete(item.id)}
          />
        </View>
      ),
      numeric: false
    }
  ];

  return (
    <>
      <TopBar title="Games"
      />
      <View style={{ flex: 1, padding: 16, alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6C48C5', marginBottom: 16 }}>
          Jogos avaliados
        </Text>
        <Table
          data={games}
          columns={columns}
        />
          <Button style={{...styles.button, width: "60%", marginTop: 15,}} onPress={() => router.push("/form")}>
            <Text style={{ color: "white" }}>Novo Jogo</Text>
          </Button>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={updatedName}
                onChangeText={setUpdatedName}
              />
              <TextInput
                style={styles.input}
                placeholder="Nota"
                value={updatedRating}
                onChangeText={setUpdatedRating}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Preço"
                value={updatedPrice}
                onChangeText={setUpdatedPrice}
                keyboardType="numeric"
              />
              <Button style={styles.button} mode="contained" onPress={handleUpdate}>Salvar</Button>
              <Button style={{...styles.button, backgroundColor: "#C68FE6", }} mode="contained" onPress={() => setModalVisible(false)}>Cancelar</Button>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
    marginLeft: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    borderColor: '#6C48C5',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    borderColor: '#6C48C5',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    backgroundColor: '#6C48C5'
  }
});
