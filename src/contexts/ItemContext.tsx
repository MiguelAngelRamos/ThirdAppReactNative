import { createContext, ReactNode, useState } from "react";
import { fireStore } from "../firebaseConfig";
import { doc, collection, setDoc } from 'firebase/firestore';
import { Alert } from "react-native";
import { uploadImageCloudinary } from "../services/uploadImageCloudinary";

interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
}
// Define la interfaz para las propiedades del contexto de item
interface ItemContextProps {
  items: Item[];
  addItem: (item: Omit<Item, 'id'>, image: string | null) => Promise<void>;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
}

// Creamos el contexto de Item
export const ItemContext = createContext<ItemContextProps|undefined>(undefined);

export const ItemProvider = ({ children } : { children: ReactNode}) => {
  // Estado de la lista de los items
  const [items, setItems] = useState<Item[]>([]);
  
  // Función para crear
  const addItem = async (item: Omit<Item, 'id'>, image: string | null) => {
    try {
      let imageUrl = '';

      if(image) {
        const uploadedUrl = await uploadImageCloudinary(image);
        if(uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          Alert.alert("Error", "no hay imagen");
          return;
        }
      }
      // Generamos el documento que enviar a la base de datos
      const newItemRef = doc(collection(fireStore, 'items'));
      const newItem = {
        id: newItemRef.id,
        ...item,
        imageUrl
      }
      await setDoc(newItemRef, newItem);
      // el codigo siguiente
      setItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      Alert.alert("Error", "No se puedo crear el item"); 
    }
  };


  // Funcion para actualizar los items de la lista
  const updateItem = (updatedItem: Item) =>
    setItems((prevItems) => 
      prevItems.map((item) =>( item.id === updatedItem.id ? updatedItem: item))
    );
  // Función para eliminar un item de la lista
  const deleteItem = (id: string) => setItems((prevItems) => prevItems.filter((item) => item.id !== id)); 

  return (
    <ItemContext.Provider value={{ items, addItem, updateItem, deleteItem}}>
      {children}
    </ItemContext.Provider>
  )

}

