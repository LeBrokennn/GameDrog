require("dotenv").config();

const { createApp } = require("./app");

const PORT = Number(process.env.PORT || 8080);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

const app = createApp({ corsOrigin: CORS_ORIGIN, uploadDir: UPLOAD_DIR });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend escuchando en http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Imágenes estáticas en /uploads -> ${UPLOAD_DIR}`);
});