import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Card({ nombre, precio }) {
  const { agregarProducto } = useContext(AppContext);

  return (
    <div className="col-md-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body text-center">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">${precio}</p>
          <button
            className="btn btn-primary"
            onClick={() => agregarProducto({ nombre, precio })}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;