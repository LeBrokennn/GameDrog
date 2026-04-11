import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const API_URL = "http://localhost:8080";

export function AppProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    const tokenGuardado = localStorage.getItem("token");
    const carritoGuardado = localStorage.getItem("carrito");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    if (tokenGuardado) {
      setToken(tokenGuardado);
    }

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const registrarUsuario = async (nuevoUsuario) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo registrar el usuario");
    }

    return data;
  };

  const iniciarSesion = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Correo o contraseña incorrectos");
    }

    setUsuario(data.usuario);
    setToken(data.token);

    localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
    localStorage.setItem("token", data.token);

    return data.usuario;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setToken("");

    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("token");
  };

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

  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  return (
    <AppContext.Provider
      value={{
        carrito,
        usuario,
        token,
        total,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}