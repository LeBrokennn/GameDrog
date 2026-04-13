import { createContext, useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/productos";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    const carritoGuardado = localStorage.getItem("carrito");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

    const obtenerProductos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProductos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    obtenerProductos();
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
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
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

  const agregarProducto = async (productoNuevo) => {
    const payload = {
      nombre: productoNuevo.nombre?.trim(),
      precio: Number(productoNuevo.precio),
      stock: Number(productoNuevo.stock),
      imagen: productoNuevo.imagen?.trim(),
      categoria: productoNuevo.categoria?.trim(),
      subcategoria: productoNuevo.subcategoria?.trim(),
      descripcion: productoNuevo.descripcion?.trim(),
    };
  
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      console.error("Error backend al agregar producto:", data);
      throw new Error(data.error || data.detalle || "No se pudo agregar el producto");
    }
  
    setProductos((prev) => [data, ...prev]);
  };

  const editarProducto = async (id, datosActualizados) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo editar el producto");
    }

    setProductos((prev) =>
      prev.map((producto) => (producto.id === id ? data : producto))
    );
  };

  const eliminarProducto = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo eliminar el producto");
    }

    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  const aumentarStock = async (id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    const nuevoStock = Number(producto.stock) + 1;

    const res = await fetch(`${API_URL}/${id}/stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: nuevoStock }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo aumentar stock");
    }

    setProductos((prev) => prev.map((p) => (p.id === id ? data : p)));
  };

  const disminuirStock = async (id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto || Number(producto.stock) <= 0) return;

    const nuevoStock = Number(producto.stock) - 1;

    const res = await fetch(`${API_URL}/${id}/stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: nuevoStock }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo disminuir stock");
    }

    setProductos((prev) => prev.map((p) => (p.id === id ? data : p)));
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
        productos,
        total,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion,
        actualizarUsuario,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        aumentarStock,
        disminuirStock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}