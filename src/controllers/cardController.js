export const getCards = async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.status(200).json({
            success: true,
            message: "Cards fetched successfully",
            data: cards,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to get cards" });
    }
};

export const getCard = async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id);
        if (card) {
            res.status(200).json({
                success: true,
                message: "Card fetched successfully",
                data: card,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Card not found",
                data: {
                    id_card: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to get card" });
    }
};

export const createCard = async (req, res) => {
    try {
        const card = await Card.create(req.body);
        res.status(201).json({
            success: true,
            message: "Card created successfully",
            data: card,
            links: {
                self: `${config.API_BASE_URL}/cards/${card.id_card}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to create card" });
    }
};

export const updateCard = async (req, res) => {
    try {
        const card = await Card.update(req.body, {
            where: { id_card: req.params.id },
        });
        res.status(200).json({
            success: true,
            message: "Card updated successfully",
            data: card,
            links: {
                self: `${config.API_BASE_URL}/cards/${card.id_card}`,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Error to update card" });
    }
};

export const deleteCard = async (req, res) => {
    try {
        const card = await Card.destroy({
            where: { id_card: req.params.id },
        });
        if (card) {
            res.status(200).json({
                success: true,
                message: "Card deleted successfully",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Card not found",
                data: {
                    id: req.params.id,
                },
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to delete card" });
    }
};
