const express = require("express");
const { scrapeProducts, scrapImages } = require("../modules/scraper");

const router = express.Router();

router.get("/product", async (req, res) => {
  const searchQuery = req.query.search?.trim() || "iphone+15";
  // console.log(searchQuery)
  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is missing or invalid" });
  }

  try {
    const results = await scrapeProducts(searchQuery);
    res.json(results);
  } catch (error) {
    console.error("Error in products route:", error.message);
    res.status(500).json({ error: "Failed to fetch products", details: error.message });
  }
});

router.get("/image", async (req, res) => {
  const searchQuery = req.query.search?.trim() || "iphone%2015";
  // console.log(searchQuery)
  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is missing or invalid" });
  }

  try {
    const results = await scrapImages(searchQuery);
    res.json(results);
  } catch (error) {
    console.error("Error in image route:", error.message);
    res.status(500).json({ error: "Failed to fetch image", details: error.message });
  }
})

module.exports = router;
