import { v2 as cloudinary } from "cloudinary"
import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test the connection
cloudinary.api.ping()
    .then(() => console.log("\n\t ✅ Cloudinary connection successful 🌨️\n"))
    .catch(err => console.error("\n\t ❌ Cloudinary connection failed:", err.message));

export default cloudinary;
