import { ItemProvider } from "./src/contexts/ItemContext";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import './src/firebaseConfig';

export default function App() {
  return (
    <ItemProvider>
      <PaperProvider>
        <AppNavigator/>
      </PaperProvider>
    </ItemProvider>
  );
}

