import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function PerfilUsuario() {
  const { usuario } = useContext(AppContext);

  if (!usuario) {
    return <p style={{ color: "white", padding: "40px" }}>Debes iniciar sesión.</p>;
  }

  return (
    <div style={{ color: "white", padding: "40px" }}>
      <h1>Mi perfil</h1>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Correo:</strong> {usuario.email}</p>
      <p><strong>Rol:</strong> {usuario.rol}</p>
    </div>
  );
}

export default PerfilUsuario;