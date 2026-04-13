import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/Navbar.css";

function Navbar() {
  const { usuario, carrito, cerrarSesion } = useContext(AppContext);
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cantidad = carrito.reduce(
    (acc, producto) => acc + Number(producto.cantidad || 0),
    0
  );

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate("/");
    setMenuAbierto(false);
  };

  const toggleMenu = () => {
    setMenuAbierto((prev) => !prev);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar-gamedrog">
      <div className="navbar-gamedrog-container">
        <div className="navbar-gamedrog-left">
          <div className="navbar-menu-wrapper">
            <button
              type="button"
              className="navbar-menu-btn"
              onClick={toggleMenu}
            >
              ☰
            </button>

            {menuAbierto && (
              <div className="navbar-dropdown">
                <Link to="/" className="navbar-dropdown-link" onClick={cerrarMenu}>
                  Home
                </Link>

                <Link
                  to="/productos"
                  className="navbar-dropdown-link"
                  onClick={cerrarMenu}
                >
                  Productos
                </Link>

                <Link
                  to="/carrito"
                  className="navbar-dropdown-link"
                  onClick={cerrarMenu}
                >
                  Carrito ({cantidad})
                </Link>
              </div>
            )}
          </div>

          <Link to="/" className="navbar-brand">
            <span className="navbar-brand-icon">🎮</span>
            <span className="navbar-brand-text">GameDrog</span>
          </Link>
        </div>

        <div className="navbar-gamedrog-center">
          <div className="navbar-search-box">
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Busca aquí tu producto gamer..."
            />
            <button type="button" className="navbar-search-btn">
              🔍
            </button>
          </div>

          <Link to="/carrito" className="navbar-cart-btn">
            🛒
            <span className="navbar-cart-count">{cantidad}</span>
          </Link>
        </div>

        <div className="navbar-gamedrog-right">
          {!usuario ? (
            <>
              <Link to="/login" className="navbar-action-btn secondary">
                Iniciar sesión
              </Link>

              <Link to="/registro" className="navbar-action-btn primary">
                Registro
              </Link>
            </>
          ) : (
            <>
              <span className="navbar-user-text">
                Hola,{" "}
                {usuario.nombre ||
                  (usuario.rol === "admin" ? "Administrador" : "Usuario")}
              </span>

              {usuario.rol === "admin" ? (
                <Link to="/admin" className="navbar-action-btn secondary">
                  Panel admin
                </Link>
              ) : (
                <Link to="/perfil" className="navbar-action-btn secondary">
                  Mi perfil
                </Link>
              )}

              <button
                type="button"
                className="navbar-action-btn secondary"
                onClick={handleCerrarSesion}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;