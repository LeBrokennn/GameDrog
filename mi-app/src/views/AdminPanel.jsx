import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function AdminPanel() {
  const { usuario } = useContext(AppContext);

  if (!usuario) {
    return <p style={{ color: "white", padding: "40px" }}>Debes iniciar sesión.</p>;
  }

  if (usuario.rol !== "admin") {
    return <p style={{ color: "white", padding: "40px" }}>No tienes permisos para entrar aquí.</p>;
  }

  return (
    <div style={{ color: "white", padding: "40px" }}>
      <h1>Panel de administrador</h1>
      <p>Bienvenida, {usuario.nombre}</p>

      <div style={{ marginTop: "20px" }}>
        <button style={{ marginRight: "10px" }}>Agregar producto</button>
        <button style={{ marginRight: "10px" }}>Editar producto</button>
        <button>Eliminar producto</button>
      </div>
    </div>
  );
}

export default AdminPanel;