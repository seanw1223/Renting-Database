const Contract = require('../models/contractModel');

exports.getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.getAll();
        res.json(contracts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getContractById = async (req, res) => {
    const id = req.params.id;
    try {
        const contract = await Contract.getById(id);
        if (contract) {
            const tenants = await Contract.getTenants(id);
            res.json({ ...contract, tenants });
        } else {
            res.status(404).json({ error: "Contract not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createContract = async (req, res) => {
    const data = req.body;
    try {
        const newId = await Contract.create(data);
        res.status(201).json({ message: `Contract created with ID: ${newId}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateContract = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const affectedRows = await Contract.update(id, data);
        if (affectedRows > 0) {
            res.json({ message: `Contract with ID: ${id} updated successfully` });
        } else {
            res.status(404).json({ error: "Contract not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteContract = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await Contract.delete(id);
        if (affectedRows > 0) {
            res.json({ message: `Contract with ID: ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: "Contract not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addTenantToContract = async (req, res) => {
    const { contractId, tenantId } = req.body;
    try {
        const affectedRows = await Contract.addTenant(contractId, tenantId);
        if (affectedRows > 0) {
            res.json({ message: `Tenant with ID: ${tenantId} added to Contract: ${contractId}` });
        } else {
            res.status(400).json({ error: "Error adding tenant to contract" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeTenantFromContract = async (req, res) => {
    const { contractId, tenantId } = req.body;
    try {
        const affectedRows = await Contract.removeTenant(contractId, tenantId);
        if (affectedRows > 0) {
            res.json({ message: `Tenant with ID: ${tenantId} removed from Contract: ${contractId}` });
        } else {
            res.status(400).json({ error: "Error removing tenant from contract" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
