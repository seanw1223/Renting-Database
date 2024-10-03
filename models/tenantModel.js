const db = require('../config/db');

class Tenant {
    // Method to fetch all tenants from the database
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM tenants');
        return rows;
    }

    // Method to fetch a tenant by its ID from the database
    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM tenants WHERE id = ?', [id]);
        return rows[0];
    }

    // Method to create a new tenant in the database
    static async create(data) {
        const query = `INSERT INTO tenants (title, first_name, surname, phone_number, email_address,
            address_line1, address_line2, town, county_city, eircode, title_other)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await db.query(query, [
            data.title,
            data.first_name,
            data.surname,
            data.phone_number,
            data.email_address,
            data.address_line1,
            data.address_line2,
            data.town,
            data.county_city,
            data.eircode,
            data.title_other
        ]);

        return result.insertId;
    }

    // Method to update a tenant in the database
    static async update(id, data) {
        const query = `UPDATE tenants SET title = ?, first_name = ?, surname = ?, phone_number = ?,
            email_address = ?, address_line1 = ?, address_line2 = ?, town = ?, county_city = ?, eircode = ?,
            title_other = ?
            WHERE id = ?`;

        const [result] = await db.query(query, [
            data.title,
            data.first_name,
            data.surname,
            data.phone_number,
            data.email_address,
            data.address_line1,
            data.address_line2,
            data.town,
            data.county_city,
            data.eircode,
            data.title_other,
            id
        ]);

        return result.affectedRows;
    }

    // Method to delete a tenant from the database
    static async delete(id) {
        const [result] = await db.query('DELETE FROM tenants WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Tenant;


// Tenant model has similar methods to landlord