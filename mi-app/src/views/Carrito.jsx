import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import fondo from "../assets/home2.png";
import "../styles/Carrito.css";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, total } = useContext(AppContext);

  return (
    <div
      className="carrito-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="carrito-overlay">
        <div className="carrito-container">
          <h2 className="carrito-title">Tu carrito 🛒</h2>

          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <h3>No hay productos en tu carrito</h3>
              <p>Agrega productos desde la tienda para verlos aquí.</p>
            </div>
          ) : (
            <div className="carrito-layout">
              <div className="carrito-lista">
                {carrito.map((p) => (
                  <div key={p.id} className="carrito-card">
                    <div className="carrito-info">
                      <div className="carrito-img">🎮</div>

                      <div>
                        <h4>{p.nombre}</h4>
                        <p className="carrito-categoria">
                          {p.categoria || "Producto Gamer"}
                        </p>
                        <p className="carrito-precio">
                          ${p.precio.toLocaleString("es-CL")}
                        </p>
                        <p className="carrito-cantidad">
                          Cantidad: {p.cantidad}
                        </p>
                      </div>
                    </div>

                    <button
                      className="carrito-delete"
                      onClick={() => eliminarDelCarrito(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>

              <div className="carrito-resumen">
                <h3>Resumen de compra</h3>

                <div className="resumen-linea">
                  <span>Productos</span>
                  <span>
                    {carrito.reduce((acc, p) => acc + p.cantidad, 0)}
                  </span>
                </div>

                <div className="resumen-linea">
                  <span>Total</span>
                  <span>${total.toLocaleString("es-CL")}</span>
                </div>

                <button className="resumen-btn-primary">
                  Continuar compra
                </button>

                <button
                  className="resumen-btn-secondary"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrito;