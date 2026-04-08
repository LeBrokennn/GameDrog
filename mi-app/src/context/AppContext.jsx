import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
      const nuevoCarrito = carrito.map((p) =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((p) => p.id !== id);
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const registrarUsuario = (nuevoUsuario) => {
    localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));
  };

  const iniciarSesion = (email, password) => {
    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (
      usuarioRegistrado &&
      usuarioRegistrado.email === email &&
      usuarioRegistrado.password === password
    ) {
      setUsuario(usuarioRegistrado);
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioRegistrado));
      return true;
    }

    return false;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioLogueado");
  };

  return (
    <AppContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        total,
        usuario,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};