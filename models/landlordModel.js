const db = require('../config/db');

class Landlord {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM landlords');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM landlords WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const query = `INSERT INTO landlords (title, first_name, surname, phone_number, email_address,
            address_line1, address_line2, town, county_city, eircode, date_of_birth,
            permission_to_rent, permission_to_email, title_other)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
            data.date_of_birth,
            data.permission_to_rent,
            data.permission_to_email,
            data.title_other
        ]);

        return result.insertId;
    }

    static async update(id, data) {
        const query = `UPDATE landlords SET title = ?, first_name = ?, surname = ?, phone_number = ?,
            email_address = ?, address_line1 = ?, address_line2 = ?, town = ?, county_city = ?, eircode = ?,
            date_of_birth = ?, permission_to_rent = ?, permission_to_email = ?, title_other = ?
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
            data.date_of_birth,
            data.permission_to_rent,
            data.permission_to_email,
            data.title_other,
            id
        ]);

        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM landlords WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Landlord;
