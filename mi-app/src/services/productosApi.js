const API_BASE =
  (process.env.REACT_APP_API_BASE || "http://localhost:8080").replace(/\/$/, "");

const PRODUCTOS_PATH =
  process.env.REACT_APP_PRODUCTOS_PATH || "/api/productos";

function normalizeProducto(p) {
  return {
    id: p.id,
    nombre: p.nombre ?? p.name ?? "Sin nombre",
    precio: Number(p.precio ?? p.price ?? 0),
    imagen:
      p.imagen ??
      p.image ??
      p.imageUrl ??
      p.urlImagen ??
      p.foto ??
      null,
  };
}

export function getApiBase() {
  return API_BASE;
}

export async function fetchProductos() {
  const url = `${API_BASE}${PRODUCTOS_PATH.startsWith("/") ? PRODUCTOS_PATH : `/${PRODUCTOS_PATH}`}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar productos`);
  }
  const data = await res.json();
  const list = Array.isArray(data) ? data : data.content ?? data.productos ?? [];
  return list.map(normalizeProducto);
}
