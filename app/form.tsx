import { ScrollView } from 'react-native';
import { Avatar, Button, Grid, SnackBar, TextInput, TopBar } from "@/components";
import { useState } from "react";
import { Text } from "react-native-paper";
import { inserirJogo } from "@/services/database"; 
import { Game } from '@/interfaces/Game';
import { router } from 'expo-router';

export default function FormScreen() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [helpData, setHelpData] = useState({
    name: null,
    rating: null,
    price: null
  });

  const verifyFields = (text: string, name: string) => {
    setHelpData((v: any) => ({
      ...v,
      [name]: text.length === 0 ? "Campo obrigatório" : null,
    }));
  }

  const handleSubmit = async () => {
    if (name.length > 0 && rating.length > 0 && price.length > 0) {
      setLoading(true);
      try {
        const newGame: Game = {
          name: name,
          rating: parseFloat(rating),
          price: parseFloat(price)
        };
        const id = await inserirJogo(newGame);
        setMessage(`Jogo salvo com sucesso! ID: ${id}`);
        setTimeout(() => {
          router.push("/games");
        }, 1500); 
      } catch (error: any) {
        setMessage("Erro ao tentar salvar o jogo");
      }
      setLoading(false);
    } else {
      setMessage("Preencha todos os campos");
      verifyFields(name, 'name');
      verifyFields(rating, 'rating');
      verifyFields(price, 'price');
    }
  };

  return <>
    <TopBar back={true} menu={false} />
    <ScrollView>
      <Grid style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
      }}>
        <Grid style={{
          marginTop: 50,
          ...styles.container,
          ...styles.padding
        }}>
          <Avatar style={{ marginTop: -30 }} size={200} source={require('../assets/images/controleRoxo.jpg')} />
        </Grid>
        <Grid style={{
          ...styles.padding,
          ...styles.container,
          textAlign: 'center',
          width: '100%'
        }}>
          <Text style={{ ...styles.title }}>Cadastrar Jogo</Text>
        </Grid>
        <Grid style={{ ...styles.padding }}>
          <TextInput
            value={name}
            onChangeText={(text: string) => {
              setName(text);
              verifyFields(text, 'name');
            }}
            label="Nome do Jogo"
            helpText={helpData.name}
            error={helpData.name !== null}
          />
        </Grid>
        <Grid style={{ ...styles.padding }}>
          <TextInput
            value={rating}
            onChangeText={(text: string) => {
              setRating(text);
              verifyFields(text, 'rating');
            }}
            label="Nota"
            keyboardType="numeric"
            helpText={helpData.rating}
            error={helpData.rating !== null}
          />
        </Grid>
        <Grid style={{ ...styles.padding }}>
          <TextInput
            value={price}
            onChangeText={(text: string) => {
              setPrice(text);
              verifyFields(text, 'price');
            }}
            label="Preço"
            keyboardType="numeric"
            helpText={helpData.price}
            error={helpData.price !== null}
          />
        </Grid>
        <Grid style={{ ...styles.padding }}>
          <Button
            style={{
              borderRadius: 0,
              backgroundColor: "#6C48C5",
            }}
            loading={loading}
            mode="contained"
            onPress={handleSubmit}>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </ScrollView>
    <SnackBar
      visible={message !== null}
      onDismiss={() => setMessage(null)}
      duration={3000}
      text={message}
    />
  </>;
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#6C48C5',
    fontWeight: 'bold',
  }
}
