const db = require('../database/database');

const paymentModel = {
    async createPayment(userID) {
        // Step 1: Retrieve the latest OrderID and TotalAmount for the given UserID
        const orderQuery = `SELECT OrderID, TotalAmount FROM \`Order\` WHERE UserID = ? ORDER BY OrderID DESC LIMIT 1`;
        const [orderResults] = await db.execute(orderQuery, [userID]);
        if (orderResults.length === 0) {
            throw new Error('No order found for the user.');
        }
        
        // Access the order data
        const { OrderID, TotalAmount } = orderResults[0];
        console.log("OrderID:", OrderID, "TotalAmount:", TotalAmount);
    
        // Step 2: Insert the new payment record
        const paymentQuery = `INSERT INTO Payment (OrderID, PaymentMethod, PaymentStatus, PaymentAmount) VALUES (?, 'Card', 'Paid', ?)`;
        const [paymentResult] = await db.execute(paymentQuery, [OrderID, TotalAmount]);
      
        return paymentResult;
    },

    async getPaymentById(id) {
        const query = `SELECT * FROM Payment WHERE PaymentID = ?`;
        const result = await db.execute(query, [id]);
        return result[0]; // Assuming the query returns an array of payments
    },

    async getAllPayments() {
        const query = `SELECT * FROM Payment`;
        const result = await db.execute(query);
        return result;
    },

    async updatePaymentById(id, paymentData) {
        try {
            const fields = ['PaymentMethod', 'PaymentStatus', 'PaymentAmount'];
            let setClause = [];
            let parameters = [];
    
            // Construct set clause and parameters only for provided fields
            fields.forEach(field => {
                if (paymentData.hasOwnProperty(field)) {
                    setClause.push(`${field} = ?`);
                    parameters.push(paymentData[field]);
                }
            });
    
            // Ensure that there's at least one field to update
            if (setClause.length === 0) {
                throw new Error('No valid fields provided for update.');
            }
    
            // Add the PaymentID to the parameters
            parameters.push(id);
    
            const query = `UPDATE Payment SET ${setClause.join(', ')} WHERE PaymentID = ?`;
            const result = await db.execute(query, parameters);
            return result;
        } catch (error) {
            // Handle the error appropriately
            console.error('Error updating payment:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    },
    

    async deletePaymentById(id) {
        const query = `DELETE FROM Payment WHERE PaymentID = ?`;
        const result = await db.execute(query, [id]);
        return result;
    }
};

module.exports = paymentModel;