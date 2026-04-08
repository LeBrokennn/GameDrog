const path = require("path");

let nextId = 1;
const productos = [];

function seedIfEmpty() {
  if (productos.length > 0) return;
  productos.push(
    { id: nextId++, nombre: "Fifa 26", precio: 500000, imagen: null },
    { id: nextId++, nombre: "Mouse", precio: 10000, imagen: null },
    { id: nextId++, nombre: "Teclado", precio: 20000, imagen: null }
  );
}

function list() {
  seedIfEmpty();
  return productos;
}

function create({ nombre, precio, imagen }) {
  const p = {
    id: nextId++,
    nombre,
    precio: Number(precio),
    imagen: imagen || null,
  };
  productos.push(p);
  return p;
}

function attachImage(id, filename) {
  const p = productos.find((x) => x.id === Number(id));
  if (!p) return null;
  p.imagen = path.posix.join("/uploads", filename);
  return p;
}

module.exports = { list, create, attachImage };

