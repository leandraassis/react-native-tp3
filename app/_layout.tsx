import { Navigator } from "expo-router";
import { SessionProvider } from "./ctx";
import Slot = Navigator.Slot;
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/constants/Theme";

export default function RootLayout() {
  const themeType = useColorScheme();

  return (
    <PaperProvider theme={themeType === "dark" ? darkTheme : lightTheme}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </PaperProvider>
  );
}


