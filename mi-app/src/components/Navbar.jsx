import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/Navbar.css";

function Navbar() {
  const { carrito, usuario, cerrarSesion, total, vaciarCarrito } = useContext(AppContext);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <>
      <nav className="navbar-custom">
        <div className="navbar-left">
          <button
            className="menu-toggle"
            onClick={() => {
              setMostrarMenu(!mostrarMenu);
              setMostrarCarrito(false);
            }}
          >
            ☰
          </button>

          <Link to="/" className="logo">
            <span className="logo-icon">🎮</span>
            <span className="logo-text">
              <span>Game</span>Drog
            </span>
          </Link>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Busca aquí tu producto gamer..."
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="nav-right">
          <button
            className="icon-btn cart-icon"
            onClick={() => {
              setMostrarCarrito(!mostrarCarrito);
              setMostrarMenu(false);
            }}
            aria-label="Abrir carrito"
          >
            <span className="cart-emoji">🛒</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          {usuario ? (
            <>
              <span className="nav-user">Hola, {usuario.nombre}</span>

              {usuario.rol === "admin" ? (
                <Link to="/admin" className="nav-btn login-btn">
                  Panel admin
                </Link>
              ) : (
                <Link to="/perfil" className="nav-btn login-btn">
                  Mi perfil
                </Link>
              )}

              <button className="nav-btn login-btn" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn">
                Iniciar sesión
              </Link>

              <Link to="/registro" className="nav-btn register-btn">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>

      {mostrarMenu && (
        <>
          <div className="menu-overlay" onClick={() => setMostrarMenu(false)}></div>

          <div className="floating-menu">
            <h4 className="menu-title">Menú</h4>

            <Link to="/" className="menu-item" onClick={() => setMostrarMenu(false)}>
              Home
            </Link>
            <Link to="/productos" className="menu-item" onClick={() => setMostrarMenu(false)}>
              Productos
            </Link>
            <Link to="/carrito" className="menu-item" onClick={() => setMostrarMenu(false)}>
              Carrito
            </Link>
          </div>
        </>
      )}

      {mostrarCarrito && (
        <>
          <div className="menu-overlay" onClick={() => setMostrarCarrito(false)}></div>

          <div className="mini-cart">
            <h4 className="menu-title">Tu carrito</h4>

            {carrito.length === 0 ? (
              <p className="mini-cart-empty">No hay productos agregados.</p>
            ) : (
              <>
                <div className="mini-cart-list">
                  {carrito.map((p) => (
                    <div key={p.id} className="mini-cart-item">
                      <div>
                        <strong>{p.nombre}</strong>
                        <p>Cantidad: {p.cantidad}</p>
                      </div>
                      <span>${(p.precio * p.cantidad).toLocaleString("es-CL")}</span>
                    </div>
                  ))}
                </div>

                <div className="mini-cart-total">
                  <span>Total</span>
                  <strong>${total.toLocaleString("es-CL")}</strong>
                </div>

                <Link
                  to="/carrito"
                  className="mini-cart-btn"
                  onClick={() => setMostrarCarrito(false)}
                >
                  Ver carrito
                </Link>

                <button className="mini-cart-clear" onClick={vaciarCarrito}>
                  Vaciar carrito
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;