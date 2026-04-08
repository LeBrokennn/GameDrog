import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import fondo from "../assets/home2.png";
import "../styles/Productos.css";

function Productos() {
  const { agregarAlCarrito } = useContext(AppContext);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [subcategoriaActiva, setSubcategoriaActiva] = useState("Todos");

  const productos = [
    {
      id: 1,
      nombre: "PlayStation 5",
      precio: 499990,
      categoria: "Consolas",
      subcategoria: "PlayStation",
      stock: 4,
      imagen: "🎮",
    },
    {
      id: 2,
      nombre: "Xbox Series X",
      precio: 459990,
      categoria: "Consolas",
      subcategoria: "Xbox",
      stock: 5,
      imagen: "🎮",
    },
    {
      id: 3,
      nombre: "Nintendo Switch OLED",
      precio: 329990,
      categoria: "Consolas",
      subcategoria: "Nintendo",
      stock: 6,
      imagen: "🎮",
    },
    {
      id: 4,
      nombre: "Spider-Man 2",
      precio: 54990,
      categoria: "Juegos",
      subcategoria: "PS5",
      stock: 8,
      imagen: "🕷️",
    },
    {
      id: 5,
      nombre: "EA FC 25",
      precio: 49990,
      categoria: "Juegos",
      subcategoria: "Xbox",
      stock: 10,
      imagen: "⚽",
    },
    {
      id: 6,
      nombre: "Teclado Mecánico RGB",
      precio: 59990,
      categoria: "Periféricos",
      subcategoria: "Teclados",
      stock: 12,
      imagen: "⌨️",
    },
    {
      id: 7,
      nombre: "Mouse Gamer Pro",
      precio: 34990,
      categoria: "Periféricos",
      subcategoria: "Mouse",
      stock: 9,
      imagen: "🖱️",
    },
    {
      id: 8,
      nombre: "Headset Gamer RGB",
      precio: 42990,
      categoria: "Periféricos",
      subcategoria: "Audífonos",
      stock: 11,
      imagen: "🎧",
    },
  ];

  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  const subcategorias =
    categoriaActiva === "Todos"
      ? ["Todos"]
      : [
          "Todos",
          ...new Set(
            productos
              .filter((p) => p.categoria === categoriaActiva)
              .map((p) => p.subcategoria)
          ),
        ];

  const productosFiltrados = productos.filter((p) => {
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
                    className={`filtro-btn ${categoriaActiva === cat ? "activo" : ""}`}
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
                      className={`filtro-btn ${subcategoriaActiva === sub ? "activo" : ""}`}
                      onClick={() => setSubcategoriaActiva(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="productos-grid">
            {productosFiltrados.map((p) => (
              <div className="producto-card" key={p.id}>
                <div className="producto-image">
                  <span>{p.imagen}</span>
                </div>

                <span className="producto-categoria">
                  {p.categoria} / {p.subcategoria}
                </span>

                <h3 className="producto-nombre">{p.nombre}</h3>

                <p className="producto-price">
                  ${p.precio.toLocaleString("es-CL")}
                </p>

                <p className="producto-stock">Stock disponible: {p.stock}</p>

                <button
                  className="producto-btn"
                  onClick={() => agregarAlCarrito(p)}
                >
                  Agregar al carrito 🛒
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productos;