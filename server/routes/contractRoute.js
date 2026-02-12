const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

router.get('/', contractController.getAllContracts);
router.get('/:id', contractController.getContractById);
router.post('/', contractController.createContract);
router.put('/:id', contractController.updateContract);
router.delete('/:id', contractController.deleteContract);

// NEW ROUTES
router.post('/addTenant', contractController.addTenantToContract);
router.post('/removeTenant', contractController.removeTenantFromContract);

module.exports = router;
