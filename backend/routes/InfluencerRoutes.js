const express = require("express");
const { getInfluencers, createInfluencerProfile } = require("../controllers/InfluencerController");
const { protect, authorize } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.get("/", getInfluencers);
router.post("/", protect, authorize("influencer"), createInfluencerProfile); // Changed creator to influencer

module.exports = router;
