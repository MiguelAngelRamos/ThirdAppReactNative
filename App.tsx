import { ItemProvider } from "./src/contexts/ItemContext";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <ItemProvider>
      <PaperProvider>
        
      </PaperProvider>
    </ItemProvider>
  );
}

