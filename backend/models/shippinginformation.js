const db = require('../database/database');


const shippinginformationModel = {
    createShippingInformation: async (userId) => {
        try {
            // Find the last OrderID for the given UserID
            const orderQuery = 'SELECT OrderID FROM `Order` WHERE UserID = ? ORDER BY OrderID DESC LIMIT 1';
            const [orderRows] = await db.execute(orderQuery, [userId]);
            if (orderRows.length === 0) {
                throw new Error('No orders found for the user.');
            }
            const lastOrderId = orderRows[0].OrderID;

            // Check if there is already a shipping entry for the last order
            const shippingCheckQuery = 'SELECT ShippingID FROM ShippingInformation WHERE OrderID = ?';
            const [shippingRows] = await db.execute(shippingCheckQuery, [lastOrderId]);
            if (shippingRows.length > 0) {
                throw new Error('Shipping information already exists for the last order.');
            }

            // Set the ShippingStatus to 'Processing'
            const shippingStatus = 'Processing';

            // Generate a random TrackingNumber (customize as needed)
            const trackingNumber = Math.random().toString(16).substring(2, 10);

            // Get the first AddressID for the given UserID
            const addressQuery = 'SELECT AddressID FROM `Address` WHERE UserID = ? ORDER BY AddressID LIMIT 1';
            const [addressRows] = await db.execute(addressQuery, [userId]);
            if (addressRows.length === 0) {
                throw new Error('No address found for the user.');
            }
            const firstAddressId = addressRows[0].AddressID;

            // Insert the new shipping information
            const insertQuery = `
                INSERT INTO ShippingInformation (OrderID, ShippingStatus, TrackingNumber, AddressID) 
                VALUES (?, ?, ?, ?)
            `;
            const result = await db.execute(insertQuery, [lastOrderId, shippingStatus, trackingNumber, firstAddressId]);
            return result;
        } catch (error) {
            console.error('Error creating shipping information:', error);
            throw error;
        }
    },

    getShippingInformationById: async (id) => {
        const query = `SELECT * FROM ShippingInformation WHERE ShippingID = ?`;
        const [rows] = await db.execute(query, [id]);
        return rows[0] || null;
    },

    getShippingInformationByOrderId: async (orderId) => {
        const query = `SELECT * FROM ShippingInformation WHERE OrderID = ?`;
        const [rows] = await db.execute(query, [orderId]);
        return rows;
    },

    updateShippingInformationById: async (id, shippingData) => {
        const { ShippingStatus, TrackingNumber, AddressID } = shippingData;
        const query = `
            UPDATE ShippingInformation 
            SET ShippingStatus = ?, TrackingNumber = ?, AddressID = ?
            WHERE ShippingID = ?
        `;
        const result = await db.execute(query, [ShippingStatus, TrackingNumber, AddressID, id]);
        return result;
    },

    deleteShippingInformationById: async (id) => {
        const query = `DELETE FROM ShippingInformation WHERE ShippingID = ?`;
        const result = await db.execute(query, [id]);
        return result;
    },


    findUserIdByOrderId: async (orderId) => {
    try {
      const query = 'SELECT UserID FROM `Order` WHERE OrderID = ?';
      const [rows] = await db.execute(query, [orderId]);
      if (rows.length > 0) {
        return rows[0].UserID; // Return the found UserID
      } else {
        throw new Error('No order found with the given OrderID.');
      }
    } catch (error) {
      console.error('Error finding UserID by OrderID:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
},
findOrderIdByShippingId: async (shippingId) => {
    try {
        const query = 'SELECT OrderID FROM ShippingInformation WHERE ShippingID = ?';
        const [rows] = await db.execute(query, [shippingId]);
        if (rows.length > 0) {
            return rows[0].OrderID; // Return the found OrderID
        } else {
            throw new Error('No order found for the given ShippingID.');
        }
    } catch (error) {
        console.error('Error finding OrderID by ShippingID:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
};

module.exports = shippinginformationModel;