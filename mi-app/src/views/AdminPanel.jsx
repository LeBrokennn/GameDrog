import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import fondo from "../assets/HOME1.png";
import "../styles/AdminPanel.css";

const subcategoriasPorCategoria = {
  Consolas: ["PlayStation", "Xbox", "Nintendo"],
  Juegos: ["PS5", "Xbox", "PC", "Nintendo"],
  "Periféricos": ["Mouse", "Teclados", "Audífonos", "Monitores"],
  Accesorios: ["Sillas", "Controles", "Cables", "Soportes"],
};

function AdminPanel() {
  const {
    productos = [],
    agregarProducto,
    editarProducto,
    eliminarProducto,
    aumentarStock,
    disminuirStock,
  } = useContext(AppContext);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria: "",
    subcategoria: "",
    descripcion: "",
  });

  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [productoEditado, setProductoEditado] = useState({
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria: "",
    subcategoria: "",
    descripcion: "",
  });

  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNuevoProducto((prev) => {
      if (name === "categoria") {
        return {
          ...prev,
          categoria: value,
          subcategoria: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setProductoEditado((prev) => {
      if (name === "categoria") {
        return {
          ...prev,
          categoria: value,
          subcategoria: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
  
    if (
      !nuevoProducto.nombre ||
      !nuevoProducto.precio ||
      !nuevoProducto.stock ||
      !nuevoProducto.imagen ||
      !nuevoProducto.categoria ||
      !nuevoProducto.subcategoria ||
      !nuevoProducto.descripcion
    ) {
      setMensaje(
        "Completa todos los campos, incluida categoría, subcategoría, descripción e imagen."
      );
      return;
    }
  
    const urlValida = /^https?:\/\/.+/i.test(nuevoProducto.imagen.trim());
  
    if (!urlValida) {
      setMensaje("La imagen debe ser una URL válida que comience con http:// o https://");
      return;
    }
  
    try {
      await agregarProducto({
        ...nuevoProducto,
        imagen: nuevoProducto.imagen.trim(),
      });
  
      setMensaje("Producto agregado correctamente.");
      setNuevoProducto({
        nombre: "",
        precio: "",
        stock: "",
        imagen: "",
        categoria: "",
        subcategoria: "",
        descripcion: "",
      });
    } catch (error) {
      setMensaje(error.message || "No se pudo agregar el producto.");
    }
  };

  const iniciarEdicion = (producto) => {
    setProductoEditandoId(producto.id);
    setProductoEditado({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen,
      categoria: producto.categoria || "",
      subcategoria: producto.subcategoria || "",
      descripcion: producto.descripcion || "",
    });
  };

  const cancelarEdicion = () => {
    setProductoEditandoId(null);
    setProductoEditado({
      nombre: "",
      precio: "",
      stock: "",
      imagen: "",
      categoria: "",
      subcategoria: "",
      descripcion: "",
    });
  };

  const guardarEdicion = async (id) => {
    if (
      !productoEditado.nombre ||
      !productoEditado.precio ||
      !productoEditado.stock ||
      !productoEditado.imagen ||
      !productoEditado.categoria ||
      !productoEditado.subcategoria ||
      !productoEditado.descripcion
    ) {
      return;
    }

    try {
      await editarProducto(id, productoEditado);
      cancelarEdicion();
    } catch (error) {
      console.error(error);
    }
  };

  const subcategoriasDisponibles =
    subcategoriasPorCategoria[nuevoProducto.categoria] || [];

  const subcategoriasEdicion =
    subcategoriasPorCategoria[productoEditado.categoria] || [];

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [productos, busqueda]);

  const totalProductos = productos.length;
  const stockTotal = productos.reduce(
    (acc, p) => acc + Number(p.stock || 0),
    0
  );
  const stockBajo = productos.filter((p) => Number(p.stock) <= 3).length;

  return (
    <section
      className="admin-page"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="admin-overlay">
        <div className="admin-container">
          <div className="admin-header">
            <span className="admin-badge">Panel administrador</span>
            <h2>Gestión de productos</h2>
            <p>
              Agrega, edita, ajusta stock y elimina productos del catálogo de
              GameDrog.
            </p>
          </div>

          <div className="admin-stats">
            <div className="admin-stat-card">
              <span>Total productos</span>
              <strong>{totalProductos}</strong>
            </div>

            <div className="admin-stat-card">
              <span>Stock total</span>
              <strong>{stockTotal}</strong>
            </div>

            <div className="admin-stat-card">
              <span>Stock bajo</span>
              <strong>{stockBajo}</strong>
            </div>
          </div>

          <div className="admin-layout">
            <div className="admin-form-card">
              <h3>Agregar producto</h3>

              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-input-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={nuevoProducto.nombre}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-input-group">
                  <label>Precio</label>
                  <input
                    type="number"
                    name="precio"
                    placeholder="Ej: 19990"
                    value={nuevoProducto.precio}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-input-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Ej: 10"
                    value={nuevoProducto.stock}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-input-group">
                  <label>Categoría</label>
                  <select
                    name="categoria"
                    value={nuevoProducto.categoria}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="Consolas">Consolas</option>
                    <option value="Juegos">Juegos</option>
                    <option value="Periféricos">Periféricos</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>

                <div className="admin-input-group">
                  <label>Subcategoría</label>
                  <select
                    name="subcategoria"
                    value={nuevoProducto.subcategoria}
                    onChange={handleChange}
                    disabled={!nuevoProducto.categoria}
                  >
                    <option value="">
                      {nuevoProducto.categoria
                        ? "Selecciona una subcategoría"
                        : "Primero selecciona una categoría"}
                    </option>

                    {subcategoriasDisponibles.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-input-group">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    placeholder="Escribe una descripción del producto"
                    value={nuevoProducto.descripcion}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>

                <div className="admin-input-group">
                  <label>URL de la imagen</label>
                  <input
                    type="text"
                    name="imagen"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={nuevoProducto.imagen}
                    onChange={handleChange}
                  />
                </div>

                {nuevoProducto.imagen && (
  <div className="admin-preview-box">
    <p>Vista previa</p>
    <img
      src={nuevoProducto.imagen}
      alt="Vista previa"
      className="admin-preview-image"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
      onLoad={(e) => {
        e.currentTarget.style.display = "block";
      }}
    />
  </div>
)}

                {mensaje && <p className="admin-message">{mensaje}</p>}

                <button type="submit" className="admin-main-btn">
                  Agregar producto
                </button>
              </form>
            </div>

            <div className="admin-products-section">
              <div className="admin-products-top">
                <h3 className="admin-products-title">Productos actuales</h3>

                <input
                  type="text"
                  className="admin-search"
                  placeholder="Buscar producto..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              <div className="admin-products-grid">
                {productosFiltrados.map((producto) => {
                  const estaEditando = productoEditandoId === producto.id;

                  return (
                    <div className="admin-product-card" key={producto.id}>
                      <div className="admin-product-image-box">
                        <img
                          src={
                            estaEditando
                              ? productoEditado.imagen || producto.imagen
                              : producto.imagen
                          }
                          alt={producto.nombre}
                          className="admin-product-image"
                        />
                      </div>

                      {estaEditando ? (
                        <div className="admin-edit-form">
                          <div className="admin-input-group">
                            <label>Nombre</label>
                            <input
                              type="text"
                              name="nombre"
                              value={productoEditado.nombre}
                              onChange={handleEditChange}
                            />
                          </div>

                          <div className="admin-input-group">
                            <label>Precio</label>
                            <input
                              type="number"
                              name="precio"
                              value={productoEditado.precio}
                              onChange={handleEditChange}
                            />
                          </div>

                          <div className="admin-input-group">
                            <label>Stock</label>
                            <input
                              type="number"
                              name="stock"
                              value={productoEditado.stock}
                              onChange={handleEditChange}
                            />
                          </div>

                          <div className="admin-input-group">
                            <label>Categoría</label>
                            <select
                              name="categoria"
                              value={productoEditado.categoria}
                              onChange={handleEditChange}
                            >
                              <option value="">Selecciona una categoría</option>
                              <option value="Consolas">Consolas</option>
                              <option value="Juegos">Juegos</option>
                              <option value="Periféricos">Periféricos</option>
                              <option value="Accesorios">Accesorios</option>
                            </select>
                          </div>

                          <div className="admin-input-group">
                            <label>Subcategoría</label>
                            <select
                              name="subcategoria"
                              value={productoEditado.subcategoria}
                              onChange={handleEditChange}
                              disabled={!productoEditado.categoria}
                            >
                              <option value="">
                                {productoEditado.categoria
                                  ? "Selecciona una subcategoría"
                                  : "Primero selecciona una categoría"}
                              </option>

                              {subcategoriasEdicion.map((sub) => (
                                <option key={sub} value={sub}>
                                  {sub}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="admin-input-group">
                            <label>Descripción</label>
                            <textarea
                              name="descripcion"
                              value={productoEditado.descripcion}
                              onChange={handleEditChange}
                              rows="4"
                            />
                          </div>

                          <div className="admin-input-group">
                            <label>URL de la imagen</label>
                            <input
                              type="text"
                              name="imagen"
                              placeholder="https://ejemplo.com/imagen.jpg"
                              value={productoEditado.imagen}
                              onChange={handleEditChange}
                            />
                          </div>

                          <div className="admin-product-actions">
                            <button
                              type="button"
  className="edit-btn"
                              onClick={() => guardarEdicion(producto.id)}
                            >
                              Guardar
                            </button>

                            <button
                              type="button"
                              className="cancel-btn"
                              onClick={cancelarEdicion}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="admin-product-info">
                            <h4>{producto.nombre}</h4>
                            <p>
                              Precio: $
                              {Number(producto.precio).toLocaleString("es-CL")}
                            </p>
                            <p>Stock: {producto.stock}</p>
                            <p>Categoría: {producto.categoria}</p>
                            <p>Subcategoría: {producto.subcategoria}</p>
                            <p className="admin-product-description">
                              {producto.descripcion}
                            </p>
                          </div>

                          <div className="admin-product-actions">
                            <button
                              type="button"
                              onClick={() => aumentarStock(producto.id)}
                              className="stock-btn"
                            >
                              + Stock
                            </button>

                            <button
                              type="button"
                              onClick={() => disminuirStock(producto.id)}
                              className="stock-btn"
                            >
                              - Stock
                            </button>

                            <button
                              type="button"
                              onClick={() => iniciarEdicion(producto)}
                              className="edit-btn"
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              onClick={() => eliminarProducto(producto.id)}
                              className="delete-btn"
                            >
                              Eliminar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {productosFiltrados.length === 0 && (
                <div className="admin-empty">
                  No se encontraron productos con esa búsqueda.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPanel;