import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp
}
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return(
    <>
    <Text>HomeScreen</Text>
    </>
  )
}

export default HomeScreen;