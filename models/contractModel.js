const db = require('../config/db');

class Contract {
    // Method to fetch all contracts from the database
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM contracts');
        return rows;
    }

    // Method to fetch a contract by its ID from the database
    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM contracts WHERE id = ?', [id]);
        return rows[0];
    }

    // Method to create a new contract in the database
    static async create(data) {
        const query = `INSERT INTO contracts (contract_date, property_address, landlord_id, fee_monthly,
            property_door_number, contract_length, property_type, property_type_other)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await db.query(query, [
            data.contract_date,
            data.property_address,
            data.landlord_id,
            data.fee_monthly,
            data.property_door_number,
            data.contract_length,
            data.property_type,
            data.property_type_other
        ]);

        return result.insertId;
    }

    // Method to update a contract in the database
    static async update(id, data) {
        const query = `UPDATE contracts SET contract_date = ?, property_address = ?, landlord_id = ?,
            fee_monthly = ?, property_door_number = ?, contract_length = ?, property_type = ?, property_type_other = ?
            WHERE id = ?`;

        const [result] = await db.query(query, [
            data.contract_date,
            data.property_address,
            data.landlord_id,
            data.fee_monthly,
            data.property_door_number,
            data.contract_length,
            data.property_type,
            data.property_type_other,
            id
        ]);

        return result.affectedRows;
    }

    // Method to delete a contract from the database
    static async delete(id) {
        const [result] = await db.query('DELETE FROM contracts WHERE id = ?', [id]);
        return result.affectedRows;
    }

    // Method to add a tenant to a contract
    static async addTenant(contractId, tenantId) {
        const [result] = await db.query('INSERT INTO contract_tenants (contract_id, tenant_id) VALUES (?, ?)', [contractId, tenantId]);
        return result.affectedRows;
    }

    // Method to remove a tenant from a contract
    static async removeTenant(contractId, tenantId) {
        const [result] = await db.query('DELETE FROM contract_tenants WHERE contract_id = ? AND tenant_id = ?', [contractId, tenantId]);
        return result.affectedRows;
    }

    // Method to fetch all tenants associated with a contract
    static async getTenants(contractId) {
        const [rows] = await db.query('SELECT tenants.* FROM tenants JOIN contract_tenants ON tenants.id = contract_tenants.tenant_id WHERE contract_tenants.contract_id = ?', [contractId]);
        return rows;
    }
}

module.exports = Contract;
