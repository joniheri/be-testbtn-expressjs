const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Selamat datang di API!");
});

// Import all routes
const productRoutes = require("./product-routes");

// implement routes
router.use("/products", productRoutes);

module.exports = router;
