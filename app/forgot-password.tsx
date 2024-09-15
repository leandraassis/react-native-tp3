import { ScrollView } from 'react-native';
import { Avatar, Button, Grid, SnackBar, TextInput } from "@/components";
import { useSession } from "@/app/ctx";
import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native-paper";

//por enqt, apenas a screen
export default function ForgotPasswordScreen() { 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [helpData, setHelpData] = useState({
        email: null,
        password: null
    });

    const verifyFields = (text: string, name: string) => {
        setHelpData((v: any) => ({
            ...v,
            [name]: text.length === 0 ? "Campo obrigatório" : null,
        }));
    }

    return <>
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
                    <Avatar size={200} source={require('../assets/images/carinhaTriste.jpg')} />
                </Grid>
                <Grid style={{
                    ...styles.padding,
                    ...styles.container,
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <Text style={{ ...styles.title }}>Esqueceu sua senha?</Text>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <TextInput
                        value={email}
                        keyboardType="email-address"
                        onChangeText={(text: string) => {
                            setEmail(text);
                            verifyFields(text, 'email');
                        }}
                        label="E-mail"
                        helpText={helpData.email}
                        error={helpData.email !== null}
                    />
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <Button
                        style={{
                            borderRadius: 0,
                            backgroundColor: "#6C48C5",
                        }}
                        loading={loading}
                        mode="contained"
                        onPress={async () => {
                            if (email.length > 0) {
                                setLoading(true);
                                setMessage("Email enviado, verifique sua caixa de entrada");
                                setLoading(false);
                            } else {
                                setMessage("Preencha todos os campos");
                                verifyFields(email, 'email');
                            }
                        }}>
                        Enviar
                    </Button>
                </Grid>
                <Grid style={{
                    ...styles.container,
                    ...styles.padding,
                }}>
                    <Button
                        style={{
                            borderRadius: 0,
                            backgroundColor: "#C68FE6",
                            width: '50%',
                        }}
                        mode="contained"
                        onPress={() => router.back()}>
                        Voltar
                    </Button>
                </Grid>
                <Grid style={{
                    ...styles.padding,
                    ...styles.container,
                }}>
                    {/*@ts-ignore*/}
                    <Text style={{
                        textAlign: 'center',
                        width: '80%',
                        color: '#6C48C5',
                    }}>Iremos enviar um email de redefinição para você, certifique-se de que seu email é válido</Text>
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