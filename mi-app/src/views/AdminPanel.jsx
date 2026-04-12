import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function AdminPanel() {
  const { usuario } = useContext(AppContext);

  const [productos, setProductos] = useState([
    { id: 1, nombre: "Mouse Gamer", precio: 19990, stock: 10 },
    { id: 2, nombre: "Teclado RGB", precio: 35990, stock: 8 },
    { id: 3, nombre: "Audífonos Pro", precio: 45990, stock: 5 },
  ]);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  if (!usuario) {
    return <div style={{ color: "white", padding: "40px" }}>Debes iniciar sesión.</div>;
  }

  if (usuario.rol !== "admin") {
    return <div style={{ color: "white", padding: "40px" }}>No tienes permisos para entrar aquí.</div>;
  }

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  const agregarProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.stock) return;

    const nuevo = {
      id: Date.now(),
      nombre: nuevoProducto.nombre,
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock),
      imagen: nuevoProducto.imagen,
    };

    setProductos([...productos, nuevo]);
    setNuevoProducto({
      nombre: "",
      precio: "",
      stock: "",
      imagen: "",
    });
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const editarStock = (id, cambio) => {
    setProductos(
      productos.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + cambio) } : p
      )
    );
  };

  return (
    <div style={{ color: "white", padding: "40px" }}>
      <h1>Panel de administrador</h1>
      <p>Bienvenida, {usuario.nombre}</p>

      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <h2>Agregar producto</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL imagen"
          value={nuevoProducto.imagen}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
        />
        <button onClick={agregarProducto}>Agregar producto</button>
      </div>

      <div>
        <h2>Gestionar productos</h2>
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              background: "#1b2238",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "12px",
              maxWidth: "500px",
            }}
          >
            <p><strong>{producto.nombre}</strong></p>
            <p>Precio: ${producto.precio.toLocaleString("es-CL")}</p>
            <p>Stock: {producto.stock}</p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={() => editarStock(producto.id, 1)}>+ Stock</button>
              <button onClick={() => editarStock(producto.id, -1)}>- Stock</button>
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;