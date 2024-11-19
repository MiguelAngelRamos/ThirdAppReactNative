import { createContext, ReactNode, useState, useEffect } from "react";
import { firestore } from "../firebaseConfig";
import { doc, collection, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
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
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const query = await getDocs(collection(firestore,  'items'));
        const itemList: Item[] = [];
        query.forEach(doc => {
          itemList.push({id: doc.id, ...doc.data()} as Item );
        });
        setItems(itemList);
      } catch (error) {
        Alert.alert("Error", "no se pudo obtener los items");
      }
    };

    fetchItems();
  },[]);

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
      const newItemRef = doc(collection(firestore, 'items'));
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
  const updateItem = async (updatedItem: Item) => {
    try {
      const itemRef = doc(firestore, 'items', updatedItem.id);
      // Comienzo a crear el item actualizado que quiero persistir en firebase
      const updatedItemData = {
        name: updatedItem.name,
        description: updatedItem.description,
        imageUrl: updatedItem.imageUrl,
      };
      await updateDoc(itemRef, updatedItemData);
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    } catch (error) {
      Alert.alert(`Error, No se pudo actualizar: ${error}`);
    }
  }

  // Función para eliminar un item de la lista
  const deleteItem = async (id: string) => {
    try {
      const itemRef = doc(firestore, 'items', id);
      await deleteDoc(itemRef);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el item.");
    }
  }; 

  return (
    <ItemContext.Provider value={{ items, addItem, updateItem, deleteItem}}>
      {children}
    </ItemContext.Provider>
  )

}

