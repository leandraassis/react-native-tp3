import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSession } from '@/app/ctx';
import { AppBar, Avatar } from '@/components';

export default function ProfileScreen() {
  const { session } = useSession();
  const [id, setId] = useState<string>('');


  useEffect(() => {
    if (session) {
      setId(session);
    }
  }, [session]);

  return (
    <>
      <AppBar title="Profile" />
      <View style={styles.container}>
        <Avatar size={200} source={require('../../assets/images/user.png')} />
        <Text style={styles.title}>ID usuário:</Text>
        <Text>{id}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 20,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    color: "#6C48C5",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
});
