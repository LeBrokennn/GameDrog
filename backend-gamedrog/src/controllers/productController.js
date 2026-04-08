const productModel = require("../models/productModel");

async function listProductos(_req, res) {
  res.json(productModel.list());
}

async function createProducto(req, res) {
  const { nombre, precio, imagen } = req.body || {};
  if (!nombre) return res.status(400).json({ error: "nombre es requerido" });
  if (precio == null || Number.isNaN(Number(precio))) {
    return res.status(400).json({ error: "precio es requerido y debe ser número" });
  }
  const p = productModel.create({ nombre, precio, imagen });
  res.status(201).json(p);
}

async function uploadImagen(req, res) {
  const { id } = req.params;
  if (!req.file) return res.status(400).json({ error: "imagen es requerida (multipart/form-data)" });

  const p = productModel.attachImage(id, req.file.filename);
  if (!p) return res.status(404).json({ error: "producto no encontrado" });

  res.json(p);
}

module.exports = { listProductos, createProducto, uploadImagen };