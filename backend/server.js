const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const authRoutes = require("./routes/AuthRoutes");
const influencerRoutes = require("./routes/InfluencerRoutes");
const campaignRoutes = require("./routes/CampaignRoutes");
const adminRoutes = require("./routes/AdminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("UchitPromo API is running...");
});

// 404 Handler for API
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Seed some influencers after DB connection
const seedInfluencers = async () => {
    try {
        const Influencer = require("./models/Influencer");
        const count = await Influencer.countDocuments();
        if (count === 0) {
            await Influencer.create([
                {
                    name: "Aman Sharma",
                    niche: "Tech & Gadgets",
                    followers: "1.2M",
                    followerCount: 1200000,
                    platform: "Instagram",
                    price: "₹15,000",
                    priceNumeric: 15000,
                    bio: "Top tech reviewer with a focus on latest gadgets.",
                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                    rating: 4.9,
                    ordersDone: 145,
                    ordersPending: 3,
                    topClients: ["Samsung", "Apple", "Dell"],
                    isOnline: true,
                    verified: true
                },
                {
                    name: "Priya Verma",
                    niche: "Lifestyle & Fashion",
                    followers: "850K",
                    followerCount: 850000,
                    platform: "YouTube",
                    price: "₹12,500",
                    priceNumeric: 12500,
                    bio: "Fashion blogger and lifestyle influencer.",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                    rating: 4.8,
                    ordersDone: 210,
                    ordersPending: 5,
                    topClients: ["Myntra", "H&M", "Zara"],
                    isOnline: false,
                    verified: true
                },
                {
                    name: "Vikram Singh",
                    niche: "Fitness & Health",
                    followers: "500K",
                    followerCount: 500000,
                    platform: "Instagram",
                    price: "₹8,000",
                    priceNumeric: 8000,
                    bio: "Certified fitness trainer.",
                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
                    rating: 4.7,
                    ordersDone: 88,
                    ordersPending: 2,
                    topClients: ["MuscleBlaze", "CultFit"],
                    isOnline: true,
                    verified: false
                }
            ]);            console.log("Seeded initial influencers");
        }
    } catch (err) {
        console.error("Seeding Error:", err.message);
    }
};

const PORT = process.env.PORT || 5000;

// Connect to DB then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        seedInfluencers();
    });
});
