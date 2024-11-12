import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import CreateEditScreen from "../screen/CreateEditScreen";

// Typescript RootStackParamList sirve para tipar las rutas de la app.
// RootStackParamList, define el nombre de los screen (pantallas) y los parametros que cada una puede recibir.
// Con el fin de proporcionar un tipado estricto para la navegación

export type RootStackParamList = {
  Home: undefined;
  CreateEdit: { item?: { id: string, name: string; description: string }} | undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Lista de Items'}}
      />
      <Stack.Screen
        name="CreateEdit"
        component={CreateEditScreen}
        options={{title: 'Crear/Editar Item'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;