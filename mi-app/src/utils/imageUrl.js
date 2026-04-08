export function resolveImageSrc(imagen, apiBase) {
  if (imagen == null || String(imagen).trim() === "") {
    return null;
  }
  const s = String(imagen).trim();
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:")) {
    return s;
  }
  const base = (apiBase || "").replace(/\/$/, "");
  const path = s.startsWith("/") ? s : `/${s}`;
  return base ? `${base}${path}` : path;
}
