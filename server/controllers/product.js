const Product = require("../models/product");
const { default: mongoose } = require("mongoose");
const { validationResult } = require("express-validator");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingProduct = await Product.findOne({ name }).lean();
    if (existingProduct)
      return res.status(400).json({ message: "Product name already exists" });

    const product = new Product({ name, description, price, category });
    await product.save();

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, category, search, sort, order } = req.query;

    page = isNaN(page) || page < 1 ? 1 : parseInt(page);
    limit = isNaN(limit) || limit < 1 ? 10 : parseInt(limit);

    const matchQuery = {};

    if (category) matchQuery.category = category;

    // Searching
    if (search) {
      matchQuery.$or = [
        { name: { $regex: search, $options: "si" } },
        { description: { $regex: search, $options: "si" } },
        { price: { $regex: search, $options: "si" } },
      ];
    }

    // sorting
    let sortOptions = { createdAt: -1 };
    if (sort) {
      const sortField = sort;
      const sortOrder = order === "asc" ? 1 : -1;
      sortOptions = { [sortField]: sortOrder };
    }

    let pipeline = [
      { $match: matchQuery },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          category: [
            { $group: { _id: null, categories: { $addToSet: "$category" } } },
            { $project: { _id: 0, categories: 1 } },
          ],
          data: [
            { $sort: sortOptions },
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                category: 1,
                createdAt: 1,
              },
            },
          ],
        },
      },
    ];

    const results = await Product.aggregate(pipeline);

    const totalProducts = results[0]?.totalCount?.length
      ? results[0].totalCount[0].count
      : 0;
    const categories = results[0]?.category?.length
      ? results[0].category[0].categories
      : 0;
    const products = results[0]?.data || [];

    res.status(200).json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalProducts / limit),
      hasPrevPage: page > 1,
      res: products,
      categories,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing product ID" });
    }

    const product = await Product.findById(id, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).send({ res: product });
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing product ID" });
    }

    const existingProduct = await Product.findOne({ name }).lean();
    if (existingProduct && existingProduct._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "Another product with this name already exists" });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing product ID" });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
