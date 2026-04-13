const express = require("express");
const router = express.Router();

const {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  updateStockProducto,
} = require("../controllers/productController");

router.get("/", getProductos);
router.post("/", createProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);
router.patch("/:id/stock", updateStockProducto);

module.exports = router;