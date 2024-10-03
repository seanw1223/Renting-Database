const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

// Routes for tenants
router.get('/', tenantController.getAllTenants);
router.get('/:id', tenantController.getTenantById);
router.post('/', tenantController.createTenant);
router.put('/:id', tenantController.updateTenant);
router.delete('/:id', tenantController.deleteTenant);

module.exports = router;
