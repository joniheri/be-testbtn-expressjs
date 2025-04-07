const joi = require("joi");

let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Smartphone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

let nextId =
  products.length > 0
    ? Math.max(...products.map((product) => product.id)) + 1
    : 1;

exports.getAllProduct = async (req, res) => {
  try {
    if (products.length === 0) {
      return res.status(404).send({
        status: "fail",
        message: "Data product is Empty",
      });
    }

    return res.send({
      status: "success",
      message: "Get Products successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return res.status(500).send({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const dataInput = req.body;

    const validationSchema = joi.object({
      name: joi.string().required(),
      price: joi.number(),
    });

    const { error } = validationSchema.validate(dataInput);
    if (error) {
      return res.status(400).send({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const newProduct = {
      id: nextId++,
      name: dataInput.name,
      price: dataInput.price,
    };
    products.push(newProduct);

    return res.status(201).send({
      status: "success",
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    return res.status(500).send({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const dataInput = req.body;

    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      return res.status(404).send({
        status: "fail",
        message: `Product with ID ${productId} not found`,
      });
    }

    const validationSchema = joi.object({
      name: joi.string().required(),
      price: joi.number().required(),
    });

    const { error } = validationSchema.validate(dataInput);
    if (error) {
      return res.status(400).send({
        status: "fail",
        message: error.details[0].message,
      });
    }

    products[productIndex] = {
      id: productId,
      name: dataInput.name,
      price: dataInput.price,
    };

    return res.status(200).send({
      status: "success",
      message: `Product with ID ${productId} updated successfully`,
      data: products[productIndex],
    });
  } catch (error) {
    console.error("Error update product:", error.message);
    return res.status(500).send({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const initialLength = products.length;
    products = products.filter((product) => product.id !== productId);

    if (products.length < initialLength) {
      return res.status(200).send({
        status: "success",
        message: `Product with ID ${productId} deleted successfully`,
      });
    } else {
      return res.status(404).send({
        status: "fail",
        message: `Product with ID ${productId} not found`,
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).send({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
