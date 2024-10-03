const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

// Routes for contracts
router.get('/', contractController.getAllContracts);
router.get('/:id', contractController.getContractById);
router.post('/', contractController.createContract);
router.put('/:id', contractController.updateContract);
router.delete('/:id', contractController.deleteContract);

// Adding/removing tenants in a contract
router.post('/add-tenant', contractController.addTenantToContract);
router.delete('/remove-tenant', contractController.removeTenantFromContract);

module.exports = router;
