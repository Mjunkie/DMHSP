const Resource = require("../models/Resource");

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res) => {
  const resources = await Resource.find();
  res.status(200).json(resources);
};

// @desc    Add a new resource
// @route   POST /api/resources
// @access  Admin
const addResource = async (req, res) => {
  const { title, description, type, link } = req.body;

  if (!title || !link) {
    return res.status(400).json({ message: "Title and link are required" });
  }

  const resource = await Resource.create({
    title,
    description,
    type,
    link,
    uploadedBy: req.user._id,
  });

  res.status(201).json(resource);
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Admin
const deleteResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  await resource.remove();
  res.status(200).json({ message: "Resource deleted" });
};

module.exports = {
  getResources,
  addResource,
  deleteResource,
};
