import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";
import { generateRandomToken } from "../utils/utils.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pro_match_images", // Pots canviar el nom del directori
        format: async (req, file) => "png", // pots canviar el format de les imatges
        public_id: (req, file) => generateRandomToken(6),
        transformation: [
            { width: 500, height: 500, crop: "limit", quality: "auto" },
        ],
    },
});

const parser = multer({ storage: storage });

export default parser;
