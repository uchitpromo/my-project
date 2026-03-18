const express = require("express");
const { getAdminStats, getAllUsers, getAllCampaigns, verifyInfluencer } = require("../controllers/AdminController");
const { protect, authorize } = require("../middleware/AuthMiddleware");
const router = express.Router();

// All routes here are protected and only for Admins
router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.get("/campaigns", getAllCampaigns);
router.put("/verify/:id", verifyInfluencer);

module.exports = router;
