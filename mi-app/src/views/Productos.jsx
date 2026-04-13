import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import fondo from "../assets/home2.png";
import "../styles/Productos.css";

function Productos() {
  const { productos, agregarAlCarrito } = useContext(AppContext);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [subcategoriaActiva, setSubcategoriaActiva] = useState("Todos");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const productosNormalizados = productos.map((p) => ({
    ...p,
    categoria: p.categoria || "General",
    subcategoria: p.subcategoria || "Sin subcategoría",
    imagen: p.imagen || "",
    descripcion:
      p.descripcion ||
      "Producto gamer disponible en GameDrog. Revisa sus detalles y agrégalo a tu carrito.",
  }));

  const categorias = [
    "Todos",
    ...new Set(productosNormalizados.map((p) => p.categoria)),
  ];

  const subcategorias =
    categoriaActiva === "Todos"
      ? ["Todos"]
      : [
          "Todos",
          ...new Set(
            productosNormalizados
              .filter((p) => p.categoria === categoriaActiva)
              .map((p) => p.subcategoria)
          ),
        ];

  const productosFiltrados = productosNormalizados.filter((p) => {
    const coincideCategoria =
      categoriaActiva === "Todos" || p.categoria === categoriaActiva;

    const coincideSubcategoria =
      subcategoriaActiva === "Todos" || p.subcategoria === subcategoriaActiva;

    return coincideCategoria && coincideSubcategoria;
  });

  return (
    <div
      className="productos-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="productos-overlay">
        <div className="productos-container">
          <h2 className="productos-title">Catálogo Gamer 🎮</h2>

          <div className="filtros-container">
            <div className="filtro-grupo">
              <h4 className="filtro-titulo">Categorías</h4>
              <div className="filtro-botones">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    className={`filtro-btn ${
                      categoriaActiva === cat ? "activo" : ""
                    }`}
                    onClick={() => {
                      setCategoriaActiva(cat);
                      setSubcategoriaActiva("Todos");
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {categoriaActiva !== "Todos" && (
              <div className="filtro-grupo">
                <h4 className="filtro-titulo">Subcategorías</h4>
                <div className="filtro-botones">
                  {subcategorias.map((sub) => (
                    <button
                      key={sub}
                      className={`filtro-btn ${
                        subcategoriaActiva === sub ? "activo" : ""
                      }`}
                      onClick={() => setSubcategoriaActiva(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {productosFiltrados.length === 0 ? (
            <div className="sin-productos">
              <p>No hay productos disponibles todavía.</p>
            </div>
          ) : (
            <div className="productos-grid">
              {productosFiltrados.map((p) => (
                <div className="producto-card" key={p.id}>
                  <div
                    className="producto-image producto-clickable"
                    onClick={() => setProductoSeleccionado(p)}
                  >
                    {p.imagen ? (
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="producto-img-real"
                      />
                    ) : (
                      <span>🎮</span>
                    )}
                  </div>

                  <span className="producto-categoria">
                    {p.categoria} / {p.subcategoria}
                  </span>

                  <h3 className="producto-nombre">{p.nombre}</h3>

                  <p className="producto-price">
                    ${Number(p.precio).toLocaleString("es-CL")}
                  </p>

                  <p className="producto-stock">Stock disponible: {p.stock}</p>

                  <div className="producto-actions">
                    <button
                      className="producto-detalle-btn"
                      onClick={() => setProductoSeleccionado(p)}
                    >
                      Ver más
                    </button>

                    <button
                      className="producto-btn"
                      onClick={() => agregarAlCarrito(p)}
                      disabled={Number(p.stock) <= 0}
                    >
                      {Number(p.stock) > 0
                        ? "Agregar al carrito 🛒"
                        : "Sin stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {productoSeleccionado && (
        <div
          className="producto-modal-overlay"
          onClick={() => setProductoSeleccionado(null)}
        >
          <div
            className="producto-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cerrar-modal"
              onClick={() => setProductoSeleccionado(null)}
            >
              ×
            </button>

            <div className="producto-modal-content">
              <div className="producto-modal-imagen">
                {productoSeleccionado.imagen ? (
                  <img
                    src={productoSeleccionado.imagen}
                    alt={productoSeleccionado.nombre}
                    className="producto-modal-img-real"
                  />
                ) : (
                  <span>🎮</span>
                )}
              </div>

              <div className="producto-modal-info">
                <span className="producto-modal-categoria">
                  {productoSeleccionado.categoria} /{" "}
                  {productoSeleccionado.subcategoria}
                </span>

                <h3>{productoSeleccionado.nombre}</h3>

                <p className="producto-modal-price">
                  ${Number(productoSeleccionado.precio).toLocaleString("es-CL")}
                </p>

                <p className="producto-modal-stock">
                  Stock disponible: {productoSeleccionado.stock}
                </p>

                <p className="producto-modal-descripcion">
                  {productoSeleccionado.descripcion}
                </p>

                <button
                  className="producto-btn"
                  onClick={() => agregarAlCarrito(productoSeleccionado)}
                  disabled={Number(productoSeleccionado.stock) <= 0}
                >
                  {Number(productoSeleccionado.stock) > 0
                    ? "Agregar al carrito 🛒"
                    : "Sin stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos;