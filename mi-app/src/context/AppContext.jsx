import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto
  const agregarProducto = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Eliminar producto
  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  // Cantidad total
  const cantidad = carrito.length;

  return (
    <AppContext.Provider
      value={{ carrito, agregarProducto, eliminarProducto, cantidad }}
    >
      {children}
    </AppContext.Provider>
  );
}