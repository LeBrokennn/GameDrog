import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Carrito() {
  const { carrito, eliminarProducto } = useContext(AppContext);

  // calcular total
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Carrito 🛒</h1>

      {carrito.length === 0 ? (
        <p className="text-center">No hay productos</p>
      ) : (
        <>
          {carrito.map((item, index) => (
            <div key={index} className="card p-3 mb-3 shadow">
              <h5>{item.nombre}</h5>
              <p>${item.precio}</p>

              <button
                className="btn btn-danger"
                onClick={() => eliminarProducto(index)}
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* TOTAL */}
          <div className="card p-3 mt-4">
            <h4>Total: ${total}</h4>

            <button className="btn btn-success mt-2">
              Ir a pagar 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;