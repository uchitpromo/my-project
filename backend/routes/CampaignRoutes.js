const express = require("express");
const { 
    createCampaign, 
    getBrandCampaigns, 
    getInfluencerCampaigns, 
    updateCampaignStatus, 
    getDashboardStats 
} = require("../controllers/CampaignController");
const { protect, authorize } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/", protect, authorize("brand"), createCampaign);
router.get("/brand", protect, authorize("brand"), getBrandCampaigns);
router.get("/influencer", protect, authorize("influencer"), getInfluencerCampaigns);
router.get("/stats", protect, getDashboardStats);
router.put("/:id/status", protect, updateCampaignStatus); // Removed authorize('influencer') to allow brands to pay

module.exports = router;
