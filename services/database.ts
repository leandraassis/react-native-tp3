import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./auth";
import { Game } from "@/interfaces/Game";

export async function inserirJogo(newGame: Game): Promise<string> {
    const docRef = await addDoc(collection(db, "jogos"), newGame);
    return docRef.id;
}

export async function listarJogos(): Promise<Game[]> {
    const querySnapshot = await getDocs(collection(db, "jogos"));
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Game));
}

export async function atualizarJogo(game: Game): Promise<void> {
    if (!game.id) {
        throw new Error("Jogo precisa ter um ID para ser atualizado");
    }
    await setDoc(doc(db, "jogos", game.id), game);
}

export async function deletarJogo(id: string): Promise<void> {
    await deleteDoc(doc(db, "jogos", id));
}
