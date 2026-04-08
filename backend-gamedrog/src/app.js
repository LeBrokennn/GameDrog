const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

function createApp({ corsOrigin, uploadDir }) {
  const app = express();

  app.use(
    cors({
      origin: corsOrigin || "*",
      credentials: true,
    })
  );
  app.use(express.json());

  // Servir imágenes/archivos estáticos
  const uploadsPath = path.resolve(process.cwd(), uploadDir || "uploads");
  app.use("/uploads", express.static(uploadsPath));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/productos", productRoutes);

  // 404
  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

module.exports = { createApp };