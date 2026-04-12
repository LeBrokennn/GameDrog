import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    const carritoGuardado = localStorage.getItem("carrito");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const registrarUsuario = async (nuevoUsuario) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find((u) => u.email === nuevoUsuario.email);
    if (existe) {
      throw new Error("Ese correo ya está registrado");
    }

    const usuarioNuevo = {
      id: Date.now(),
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      password: nuevoUsuario.password,
      rol: "cliente",
      direccion: "",
      telefono: "",
      avatar: "",
      compras: [],
    };

    usuarios.push(usuarioNuevo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return usuarioNuevo;
  };

  const iniciarSesion = async (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const adminQuemado = {
      id: 999,
      nombre: "Administrador",
      email: "admin@gamedrog.cl",
      password: "123456",
      rol: "admin",
      direccion: "",
      telefono: "",
      avatar: "",
      compras: [],
    };

    const usuarioEncontrado =
      usuarios.find((u) => u.email === email && u.password === password) ||
      (email === adminQuemado.email && password === adminQuemado.password
        ? adminQuemado
        : null);

    if (!usuarioEncontrado) {
      throw new Error("Correo o contraseña incorrectos");
    }

    setUsuario(usuarioEncontrado);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

    return usuarioEncontrado;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioLogueado");
  };

  const actualizarUsuario = (datosActualizados) => {
    if (!usuario) return;

    const usuarioActualizado = { ...usuario, ...datosActualizados };

    setUsuario(usuarioActualizado);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado));

    if (usuarioActualizado.rol === "cliente") {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const nuevosUsuarios = usuarios.map((u) =>
        u.id === usuarioActualizado.id ? usuarioActualizado : u
      );

      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    }
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
        total,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion,
        actualizarUsuario,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}