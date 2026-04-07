import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const { carrito, cantidad, eliminarProducto } = useContext(AppContext);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container d-flex justify-content-between">

        {/* IZQUIERDA */}
        <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Home
          </Link>

          <Link className="btn btn-outline-light" to="/productos">
            Productos
          </Link>
        </div>

        {/* DERECHA */}
        <div className="d-flex align-items-center">

          {/* CARRITO */}
          <div style={{ position: "relative", marginRight: "15px" }}>
            <button
              className="btn btn-warning"
              onClick={() => setMostrarCarrito(!mostrarCarrito)}
            >
              🛒
            </button>

            {/* BURBUJA */}
            {cantidad > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "4px 8px",
                  fontSize: "12px"
                }}
              >
                {cantidad}
              </span>
            )}

            {/* PANEL DESPLEGABLE */}
            {mostrarCarrito && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50px",
                  width: "250px",
                  background: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)"
                }}
              >
             <Link to="/carrito" className="btn btn-warning">
  🛒
</Link>

                {carrito.length === 0 ? (
                  <p>No hay productos</p>
                ) : (
                  carrito.map((item, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <p>{item.nombre}</p>
                      <p>${item.precio}</p>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarProducto(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))
                )}

                <Link to="/carrito" className="btn btn-primary w-100 mt-2">
                  Ver carrito completo
                </Link>
              </div>
            )}
          </div>

          {/* LOGIN */}
          <button className="btn btn-outline-light me-2">
            Iniciar sesión
          </button>

          {/* REGISTRO */}
          <button className="btn btn-primary">
            Registrarse
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;