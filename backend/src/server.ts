import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import compression from "compression";
import NodeCache from "node-cache";

const app = express();
const PORT = 3001;

// Enable CORS and compression
app.use(cors());
app.use(compression());

// Directory paths for images
const baseImagesDir = path.join(__dirname, "../images");
const avifDir = path.join(baseImagesDir, "avif");
const jpgDir = path.join(baseImagesDir, "jpg");

// Serve static images from both folders
app.use("/images/avif", express.static(avifDir));
app.use("/images/jpg", express.static(jpgDir));

// Initialize cache with a default TTL of 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

app.get("/api/images", async (req: Request, res: Response): Promise<void> => {
  try {
    // Get the format from the query parameter (default to 'avif')
    const format = req.query.format === "jpg" ? "jpg" : "avif";
    const imagesDir = format === "jpg" ? jpgDir : avifDir;

    // Check if the response is already cached
    const cacheKey = `imageUrls-${format}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      res.json(cachedData);
      return;
    }

    if (!fs.existsSync(imagesDir)) {
      console.error(`Images directory not found: ${imagesDir}`);
      res.status(500).json({ error: `Images directory not found for format: ${format}` });
      return;
    }

    const files = await fs.promises.readdir(imagesDir);

    // Sort filenames numerically (e.g., image1, image2, ..., image20)
    const sortedFiles = files.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
      return numA - numB;
    });

    // Generate URLs for the images
    const imageUrls = sortedFiles.map(
      (file) => `http://localhost:${PORT}/images/${format}/${file}`
    );

    // Add caching headers
    res.set("Cache-Control", "public, max-age=3600"); 
    res.set("ETag", JSON.stringify(imageUrls));

    // Cache the response
    cache.set(cacheKey, imageUrls);

    res.json(imageUrls);
  } catch (error) {
    console.error("Error processing images:", error);
    res.status(500).json({ error: "Failed to process images" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});