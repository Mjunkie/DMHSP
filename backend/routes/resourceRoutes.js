const express = require("express");
const router = express.Router();
const {
  getResources,
  addResource,
  deleteResource,
} = require("../controllers/resourceController");
const { protect, admin }= require("../middleware/authMiddleware");

router.get("/", protect, getResources);       // View all resources
router.post("/", protect, admin, addResource); // Admin-only upload
router.delete("/:id", protect, admin, deleteResource); // Admin-only delete

module.exports = router;
