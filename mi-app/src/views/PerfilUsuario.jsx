import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import fondo from "../assets/HOME1.png";
import "../styles/PerfilUsuario.css";

function PerfilUsuario() {
  const { usuario } = useContext(AppContext);

  const nombre = usuario?.nombre || "Usuario";
  const email = usuario?.email || "correo@ejemplo.com";
  const rol = usuario?.rol || "cliente";
  const inicial = nombre.charAt(0).toUpperCase();

  return (
    <section
      className="perfil-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="perfil-overlay">
        <div className="perfil-card">
          <div className="perfil-top">
            <div className="perfil-avatar">{inicial}</div>

            <div className="perfil-top-text">
              <span className="perfil-badge">Mi cuenta</span>
              <h2>Perfil de usuario</h2>
              <p>Revisa tu información y sigue explorando tu experiencia gamer.</p>
            </div>
          </div>

          <div className="perfil-resumen">
            <div className="perfil-resumen-box">
              <span>Estado</span>
              <strong>Cuenta activa</strong>
            </div>

            <div className="perfil-resumen-box">
              <span>Rol</span>
              <strong>{rol}</strong>
            </div>

            <div className="perfil-resumen-box">
              <span>Acceso</span>
              <strong>Tienda online</strong>
            </div>
          </div>

          <div className="perfil-info">
            <div className="perfil-item">
              <span>Nombre</span>
              <p>{nombre}</p>
            </div>

            <div className="perfil-item">
              <span>Correo</span>
              <p>{email}</p>
            </div>

            <div className="perfil-item">
              <span>Rol</span>
              <p>{rol}</p>
            </div>
          </div>

          <div className="perfil-actions">
            <Link to="/productos" className="perfil-btn principal">
              Ver productos
            </Link>

            <Link to="/carrito" className="perfil-btn secundario">
              Ir al carrito
            </Link>

            <Link to="/" className="perfil-btn terciario">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerfilUsuario;