import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function PerfilUsuario() {
  const { usuario } = useContext(AppContext);

  const [datos, setDatos] = useState({
    nombre: usuario?.nombre || "",
    email: usuario?.email || "",
    direccion: "",
    telefono: "",
    avatar: "",
  });

  const [compras] = useState([
    { id: 1, fecha: "2026-04-01", total: 35990, estado: "Entregado" },
    { id: 2, fecha: "2026-04-08", total: 49990, estado: "En preparación" },
  ]);

  if (!usuario) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Debes iniciar sesión para ver tu perfil.
      </div>
    );
  }

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ color: "white", padding: "40px" }}>
      <h1>Mi perfil</h1>

      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <p><strong>Nombre:</strong> {datos.nombre}</p>
        <p><strong>Correo:</strong> {datos.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>Editar datos</h2>
        <input
          type="text"
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
        />
        <input
          type="text"
          name="direccion"
          value={datos.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
        />
        <input
          type="text"
          name="telefono"
          value={datos.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
        />
        <input
          type="text"
          name="avatar"
          value={datos.avatar}
          onChange={handleChange}
          placeholder="URL imagen de perfil"
          style={{ display: "block", marginBottom: "10px", padding: "10px", width: "300px" }}
        />
      </div>

      <div>
        <h2>Mis compras</h2>
        {compras.map((compra) => (
          <div
            key={compra.id}
            style={{
              background: "#1b2238",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "12px",
              maxWidth: "420px",
            }}
          >
            <p><strong>Pedido:</strong> #{compra.id}</p>
            <p><strong>Fecha:</strong> {compra.fecha}</p>
            <p><strong>Total:</strong> ${compra.total.toLocaleString("es-CL")}</p>
            <p><strong>Estado:</strong> {compra.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerfilUsuario;