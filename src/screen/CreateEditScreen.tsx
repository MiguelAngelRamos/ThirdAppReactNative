import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { useItemContext } from '../hooks/useItemContext';
import { Formik } from 'formik';
import * as Yup from 'yup';


// Tipo de navegacion
type CreateEditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateEdit'>;

// RouteProp sirve para recibir los parametros que se pasan al screen(pantalla)
type CreateEditScreenRouteProp = RouteProp<RootStackParamList, 'CreateEdit'>;

interface CreateEditScreenProps {
  navigation: CreateEditScreenNavigationProp,
  route: CreateEditScreenRouteProp
}

// Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida')
})

const CreateEditScreen: React.FC<CreateEditScreenProps> = ({navigation, route}) => {
  const { addItem, updateItem } = useItemContext(); // Obtiene las funciones del contexto
  const item = route.params?.item; // Obtiene el item de los parámetros de la ruta
  return(
    <Formik
      initialValues={{
        name: item ? item.name: '', // valor inicial del campo nombre
        description: item ? item.description: '', // valor inicial del campo descripción
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if(item) {
          updateItem({...item, ...values})
        } else {
          addItem({
            id: Math.random().toString(),
            name: values.name,
            description: values.description
          });
        }
        navigation.goBack(); // Home
      }}
      validateOnBlur
      validateOnChange
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <TextInput 
            label="Nombre"
            mode="outlined"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            error={touched.name}
          />

          <TextInput 
            label="Descripción"
            mode='outlined'
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            error={touched.description}
            style ={styles.inputSpacing}
          />

          <Button 
            mode="contained"
            onPress = {() => handleSubmit()}
            style={styles.submitButton}
            >
            {item ? 'Actualizar': 'Agregar'}
          </Button>
        </View>
      )}
  
    </Formik>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  inputSpacing: {
    marginTop: 16,
  },
  submitButton: {
    marginTop: 24
  }
})

export default CreateEditScreen;