// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
});

export default cloudinary;
