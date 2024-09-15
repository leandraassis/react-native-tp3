import { useContext, createContext, type PropsWithChildren, useEffect } from 'react';
import { setStorageItemAsync, useStorageState } from './useStorageState';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/auth';
import { router } from 'expo-router';

async function LogginUser(email: string, senha: string) {
    const retorno: { id?: string; email?: string; senha?: string; erro?: string } = {};
    try {
        const credenciais = await signInWithEmailAndPassword(auth, email, senha);
        console.log(credenciais);
        retorno.id = credenciais.user.uid;
        retorno.email = email;
        retorno.senha = senha;
    } catch (error: any) {
        console.log(`${error.code} = ${error.message}`);
        retorno.erro = `Login inválido`;
        throw new Error(retorno.erro);
    }
    return retorno;
}

const AuthContext = createContext<{
    signIn: (email: string, senha: string) => Promise<void>;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    changeTheme: (theme: string) => void;
    theme?: string | null;
    isLoadingTheme: boolean;
}>({
    signIn: async () => { },
    signOut: () => { },
    session: null,
    isLoading: false,
    changeTheme: async () => { },
    theme: null,
    isLoadingTheme: false,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return value;
}


export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[isLoadingTheme, theme], setTheme] = useStorageState('theme');

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email: string, senha: string) => {
                    const loginResponse = await LogginUser(email, senha);
                    if (loginResponse.id) {
                        setSession(loginResponse.id);
                        return router.replace("/(tabs)");
                    } else {
                        console.log(loginResponse.erro);
                    }
                },
                signOut: async () => {
                    setSession(null);
                    await auth.signOut();
                    return router.replace("/login");
                },
                changeTheme: async (theme: string) => {
                    await setStorageItemAsync('theme', theme);
                    setTheme(theme);
                },
                session,
                isLoading,
                theme,
                isLoadingTheme,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
