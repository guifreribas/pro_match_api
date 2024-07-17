import Resource from "../models/resourceModel.js";
import { extractFileName } from "../utils/utils.js";

export const createResource = async (req, res) => {
    try {
        const imageUrl = req.file.path;
        const publicId = extractFileName(req.file.path);

        res.status(200).json({
            message: "Imatge pujada correctament",
            publicId: publicId,
            imageUrl,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Hi ha hagut un error pujant la imatge",
            error: error.message,
        });
    }
};

export const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.destroy({
            where: { id_resource: req.params.id },
        });
        if (resource) {
            res.status(200).json({
                success: true,
                message: "Resource deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Resource not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete resource" });
    }
};
