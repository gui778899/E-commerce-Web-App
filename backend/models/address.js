// addressModel.js
const db = require('../database/database');

const addressModel = {
    createAddress: async (UserID, addressData) => {
        const { AddressLine1, City, State, PostalCode, Country } = addressData;
        const query = `
            INSERT INTO Address (UserID, AddressLine1, City, State, PostalCode, Country) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await db.execute(query, [UserID, AddressLine1, City, State, PostalCode, Country]);
        return result;
    },
    

    getAddressById: async (id) => {
        const query = `SELECT * FROM Address WHERE AddressID = ?`;
        const [rows] = await db.execute(query, [id]);
        return rows[0] || null;
    },

    getAddressesByUserId: async (userId) => {
        const query = `SELECT * FROM Address WHERE UserID = ?`;
        const [rows] = await db.execute(query, [userId]);
        return rows;
    },

    updateAddressById: async (id, addressData) => {
        const { AddressLine1, City, State, PostalCode, Country } = addressData;
        const query = `
            UPDATE Address 
            SET AddressLine1 = ?, City = ?, State = ?, PostalCode = ?, Country = ?
            WHERE AddressID = ?
        `;
        const result = await db.execute(query, [AddressLine1, City, State, PostalCode, Country, id]);
        return result;
    },

    deleteAddressById: async (id) => {
        const query = `DELETE FROM Address WHERE AddressID = ?`;
        const result = await db.execute(query, [id]);
        return result;
    }
};

module.exports = addressModel;
