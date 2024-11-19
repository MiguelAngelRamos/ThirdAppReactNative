import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { useItemContext } from '../hooks/useItemContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';



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
});


 
const CreateEditScreen: React.FC<CreateEditScreenProps> = ({navigation, route}) => {
  const { addItem, updateItem } = useItemContext(); // Obtiene las funciones del contexto
  const item = route.params?.item; // Obtiene el item de los parámetros de la ruta
  const [image, setImage] = useState<string | null>(item?.imageUrl || null);
  const [isLoading, setIsLoading] = useState(false); // el estado de la carga
  // Las funciones para fotos
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });
    
    if(!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });
    
    if(!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  }
  return(
    <Formik
      initialValues={{
        name: item ? item.name: '', // valor inicial del campo nombre
        description: item ? item.description: '', // valor inicial del campo descripción
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          if(item) {
            await updateItem({...item, ...values, imageUrl: image})
          } else {
            await addItem({
              name: values.name,
              description: values.description
            }, image);
          }
          navigation.goBack(); // Home
        } catch (error) {
          Alert.alert("Error", "No se puedo guardar en la base de datos");
        } finally {
          setIsLoading(false);
        }
 
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
            error={touched.name && !!errors.name}
          />
          {touched.name && errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          <TextInput 
            label="Descripción"
            mode='outlined'
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            error={touched.description && !!errors.description}
            style ={styles.inputSpacing}
          />
          {touched.description && errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          <View style={styles.imageContainer}>
            {image && <Image source={{ uri: image }} style={styles.image} resizeMode='contain'/>}
            <Button onPress={pickImage}>Seleccionar Imagen</Button>
            <Button onPress={takePhoto}>Toma Foto</Button>
          </View>
          {
            isLoading ? (
              <ActivityIndicator animating={true} size={"large"}/>):(
              <Button 
              mode="contained"
              onPress = {() => handleSubmit()}
              style={styles.submitButton}
              >
              {item ? 'Actualizar': 'Agregar'}
            </Button>
            )
          }
   
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4
  },
  submitButton: {
    marginTop: 24
  },
  imageContainer: {
    marginTop: 16,
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16
  }

})

export default CreateEditScreen;