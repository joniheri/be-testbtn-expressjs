const express = require("express");
const router = express.Router();

// Import controller
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-controller");

// Endpoint
router.get("/", getAllProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
