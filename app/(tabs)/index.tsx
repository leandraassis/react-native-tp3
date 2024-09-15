import React from 'react';
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native';
import { IconButton, TopBar } from '@/components';

export default function HomeScreen() {
  return (
    <>
      <TopBar title="Home" />
      <ScrollView>
        <View style={styles.container}>
        <Image
          source={require('../../assets/images/controller.png')}
          style={styles.image}
        />
        <IconButton
          icon="arrow-down"
          size={40}
        />
        <Text style={{ ...styles.text, width: "90%" }}>Catalogue seus jogos, dê notas e anote seus preços!</Text>
        <IconButton
          icon="arrow-down"
          size={40}
        />
        <Text style={{ ...styles.text, width: "90%" }}>Mantenha controle sobre o que já jogou e quanto já gastou!</Text>
        <IconButton
          icon="arrow-down"
          size={40}
        />
        <Text style={{ ...styles.text, width: "90%" }}>Compartilhe com seus amigos!</Text>
        </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "100%",
  },
  text: {
    fontSize: 24,
    color: '#6C48C5',
    fontWeight: 'bold',
    marginBottom: 16, 
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: 'cover',
  },
});
