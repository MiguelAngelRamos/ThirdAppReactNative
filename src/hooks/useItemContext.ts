import { useContext } from "react";
import { ItemContext } from "../contexts/ItemContext";

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if(!context) {
    throw new Error('useItemContext debe usar dentro del itemprovider');
  }

  return context;
}