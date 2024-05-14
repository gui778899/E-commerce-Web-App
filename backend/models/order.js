// models/order.js
const db = require('../database/database');

exports.create = async function create(userId, orderData) {
    try {
        // First, retrieve the cart ID for the given user ID
        const [cartRows] = await db.query('SELECT CartID FROM Cart WHERE UserID = ?', [userId]);

        // Check if the cart exists
        if (!cartRows.length) {
            throw new Error('No cart found for this user.');
        }
        const cartId = cartRows[0].CartID;
        
        const [totalAmountRows] = await db.query(
            'SELECT SUM(Quantity * Price) AS TotalAmount FROM Cart_Item WHERE CartID = ?', 
            [cartId]
        );
        
        if (!totalAmountRows.length) {
            throw new Error('No cart items found for this cart.');
        }
        const TotalAmount = totalAmountRows[0].TotalAmount;
        const Status = "Processing";

        // Prepare the order data, including the retrieved CartID and UserID
        const newOrderData = {
            ...orderData, // Spread operator to include other order data
            OrderStatus: Status, // Add the order status to the order data
            CartID: cartId, // Add the CartID to the order data
            UserID: userId, // Add the UserID to the order data
            TotalAmount: TotalAmount
        };
        console.log('newOrderData:', newOrderData);
        
        // Create a new order in the database with the combined data
        const [result] = await db.query('INSERT INTO `Order` SET ?', [newOrderData]);
        console.log('Order created with ID:', result.insertId);

        // Return the new order ID
        return result.insertId;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};


exports.findAll = async function findAll() {
    // Logic to retrieve all orders from the database
    const result = await db.query('SELECT * FROM `Order`');
    return result;
};

exports.findById = async function findById(orderId) {
    // Logic to retrieve a single order by ID from the database
    const [result] = await db.query('SELECT * FROM `Order` WHERE `OrderID` = ?', [orderId]);
    return result.length ? result[0] : null;
};

exports.updateById = async function updateById(orderId, data) {
    // Logic to update an existing order by ID in the database
    const [result] = await db.query('UPDATE `Order` SET ? WHERE `OrderID` = ?', [data, orderId]);
    console.log('Order updated:', result.affectedRows, 'rows affected');
    return result.affectedRows;
};

exports.deleteById = async function deleteById(orderId) {
    // Logic to delete an order by ID from the database
    const [result] = await db.query('DELETE FROM `Order` WHERE `OrderID` = ?', [orderId]);
    return result;
};



exports.findMostRecentOrderIdByUserId = async function(userId) {
    const query = `
        SELECT OrderID FROM \`Order\`
        WHERE UserID = ?
        ORDER BY OrderDate DESC
        LIMIT 1`;

    try {
        const [rows] = await db.execute(query, [userId]);
        return rows.length ? rows[0].OrderID : null;
    } catch (error) {
        throw new Error('Database error: ' + error.message);
    }
};
