const Landlord = require('../models/landlordModel');

exports.getAllLandlords = async (req, res) => {
    try {
        const landlords = await Landlord.getAll();
        res.json(landlords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLandlordById = async (req, res) => {
    const id = req.params.id;
    try {
        const landlord = await Landlord.getById(id);
        if (landlord) {
            res.json(landlord);
        } else {
            res.status(404).json({ error: "Landlord not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLandlord = async (req, res) => {
    const data = req.body;
    try {
        const newId = await Landlord.create(data);
        res.status(201).json({ message: `Landlord created with ID: ${newId}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLandlord = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const affectedRows = await Landlord.update(id, data);
        if (affectedRows > 0) {
            res.json({ message: `Landlord with ID: ${id} updated successfully` });
        } else {
            res.status(404).json({ error: "Landlord not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLandlord = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await Landlord.delete(id);
        if (affectedRows > 0) {
            res.json({ message: `Landlord with ID: ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: "Landlord not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
