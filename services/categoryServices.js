const CategoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");

//get categories without pagination
// exports.getCategories = asyncHandler(async (req, res) => {
//   const categories = await CategoryModel.find({});
//   res.status(200).json({ results: categories.length, data: categories });
// });

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

//get categories with pagination
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public

//get category
exports.getCategory = asyncHandler(async (req, res, next) => {
  //1- then() catch(err)
  //2- try{} catch(err)
  //3- asyncHandler(async) ==>express error handler
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    // res.status(404).json({ msg: `no category for this id: ${id}` });
    return next(new ApiError(`no category for this id: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private

//create category
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  //   //old syntax
  //   CategoryModel.create({ name, slug: slugify(name) })
  //     .then((category) => res.status(201).json({ data: category }))
  //     .catch((err) => {
  //       res.status(400).send(err);
  //     });
  //async await syntax without async-handler
  //   try {
  //     const category = await CategoryModel.create({ name, slug: slugify(name) });
  //     res.status(201).json({ data: category });
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
  //async await with async handler
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private

//update category
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    // res.status(404).json({ msg: `no category for this id: ${id}` });
    return next(new ApiError(`no category for this id: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private

//delete category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    // res.status(404).json({ msg: `no category for this id: ${id}` });
    return next(new ApiError(`no category for this id: ${id}`, 404));
  }
  res.status(204).send();
});
