const Tenant = require('../models/tenantModel');

// Controller function to get all tenants
exports.getAllTenants = async (req, res) => {
    try {
       
        const tenants = await Tenant.getAll();
      
        res.json(tenants);
    } catch (error) {
     
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a tenant by ID
exports.getTenantById = async (req, res) => {
    const id = req.params.id;
    try {
      
        const tenant = await Tenant.getById(id);
      
        if (tenant) {
            res.json(tenant);
        } else {
            res.status(404).json({ error: "Tenant not found" });
        }
    } catch (error) {
      
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new tenant
exports.createTenant = async (req, res) => {
    const data = req.body;
    try {
      
        const newId = await Tenant.create(data);
        // Send a 201 status code along with a success message containing the ID of the newly created tenant
        res.status(201).json({ message: `Tenant created with ID: ${newId}` });
    } catch (error) {
        // If an error occurs, send a 500 status code along with the error message, this is the same for all functions
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a tenant
exports.updateTenant = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      
        const affectedRows = await Tenant.update(id, data);
       
        if (affectedRows > 0) {
            res.json({ message: `Tenant with ID: ${id} updated successfully` });
        } else {
            res.status(404).json({ error: "Tenant not found" });
        }
    } catch (error) {
      
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a tenant
exports.deleteTenant = async (req, res) => {
    const id = req.params.id;
    try {
       
        const affectedRows = await Tenant.delete(id);
        
        if (affectedRows > 0) {
            res.json({ message: `Tenant with ID: ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: "Tenant not found" });
        }
    } catch (error) {
        // If an error occurs, send a 500 status code along with the error message
        res.status(500).json({ error: error.message });
    }
};



// all controllers have similar layouts
