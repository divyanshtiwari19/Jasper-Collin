const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { validateProduct } = require("../validators/validators");
const { requireSignIn } = require("../middleware/middleware");

router.post("/products", requireSignIn, validateProduct, createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", requireSignIn, validateProduct, updateProduct);
router.delete("/products/:id", requireSignIn, deleteProduct);

module.exports = router;
