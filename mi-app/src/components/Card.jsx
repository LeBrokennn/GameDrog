import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { resolveImageSrc } from "../utils/imageUrl";

function Card({ id, nombre, precio, imagen, apiBase }) {
  const { agregarProducto } = useContext(AppContext);
  const [imgOk, setImgOk] = useState(true);

  const src = resolveImageSrc(imagen, apiBase);

  return (
    <div className="col-md-4">
      <div className="card shadow-sm mb-4 h-100">
        {src && imgOk ? (
          <img
            src={src}
            className="card-img-top object-fit-cover"
            alt={nombre}
            style={{ height: "200px" }}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div
            className="bg-secondary-subtle d-flex align-items-center justify-content-center text-secondary"
            style={{ height: "200px" }}
          >
            Sin imagen
          </div>
        )}
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">${precio}</p>
          <button
            type="button"
            className="btn btn-primary mt-auto"
            onClick={() => agregarProducto({ id, nombre, precio, imagen })}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
