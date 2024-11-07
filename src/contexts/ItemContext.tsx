import { createContext, ReactNode, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}
// Define la interfaz para las propiedades del contexto de item
interface ItemContextProps {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
}

// Creamos el contexto de Item
export const ItemContext = createContext<ItemContextProps|undefined>(undefined);

export const ItemProvider = ({ children } : { children: ReactNode}) => {
  // Estado de la lista de los items
  const [items, setItems] = useState<Item[]>([]);
  // Función para crear
  const addItem = (item: Item) => setItems((prevItems) => [...prevItems, item]);
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

