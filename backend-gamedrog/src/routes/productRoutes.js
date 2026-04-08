const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const productController = require("../controllers/productController");

const router = express.Router();

const uploadDir = path.resolve(process.cwd(), process.env.UPLOAD_DIR || "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeExt = path.extname(file.originalname || "").toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const upload = multer({ storage });

router.get("/", productController.listProductos);
router.post("/", productController.createProducto);
router.post("/:id/imagen", upload.single("imagen"), productController.uploadImagen);

module.exports = router;

