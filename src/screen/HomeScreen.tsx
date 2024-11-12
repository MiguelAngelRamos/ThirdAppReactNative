import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { Button, Card, Text, FAB } from 'react-native-paper';
import { useItemContext } from '../hooks/useItemContext'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {items, deleteItem } = useItemContext();
  return(
    <View style={styles.container}>
    <FlatList 
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Title title={item.name}></Card.Title>
          <Card.Content>
            <Text>{item.description}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('CreateEdit', {item})}>Editar</Button>
            <Button>Eliminar</Button>
          </Card.Actions>
        </Card>
      )}
     />
     <FAB
      style={styles.fab} 
      icon="plus"
      onPress={() => navigation.navigate('CreateEdit')}
      label="Agregar"
     />
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  padding: 16
 },
 card: {
  marginBottom: 16
 },
 fab: {
  position: 'absolute',
  margin: 16,
  right: 0,
  bottom: 0,
},

});
export default HomeScreen;