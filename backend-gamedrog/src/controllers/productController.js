const pool = require("../config/db");

const getProductos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      error: "Error al obtener productos",
      detalle: error.message,
    });
  }
};

const createProducto = async (req, res) => {
  try {
    const {
      nombre,
      precio,
      stock,
      imagen,
      categoria,
      subcategoria,
      descripcion,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO productos
      (nombre, precio, stock, imagen, categoria, subcategoria, descripcion)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [nombre, precio, stock, imagen, categoria, subcategoria, descripcion]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({
      error: "Error al crear producto",
      detalle: error.message,
    });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      precio,
      stock,
      imagen,
      categoria,
      subcategoria,
      descripcion,
    } = req.body;

    const result = await pool.query(
      `UPDATE productos
       SET nombre = $1,
           precio = $2,
           stock = $3,
           imagen = $4,
           categoria = $5,
           subcategoria = $6,
           descripcion = $7
       WHERE id = $8
       RETURNING *`,
      [nombre, precio, stock, imagen, categoria, subcategoria, descripcion, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al editar producto:", error);
    res.status(500).json({
      error: "Error al editar producto",
      detalle: error.message,
    });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM productos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      error: "Error al eliminar producto",
      detalle: error.message,
    });
  }
};

const updateStockProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const result = await pool.query(
      "UPDATE productos SET stock = $1 WHERE id = $2 RETURNING *",
      [stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar stock:", error);
    res.status(500).json({
      error: "Error al actualizar stock",
      detalle: error.message,
    });
  }
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  updateStockProducto,
};