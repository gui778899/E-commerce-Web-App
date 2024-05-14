const db = require('../database/database'); 
const CartModel = require('../models/cart');

exports.getCartItems = async function getCartItems(cartId) {
    const [rows] = await db.query('SELECT * FROM Cart_Item WHERE CartID = ?', [cartId]);
    console.log(rows);
    return rows;
    }


exports.addItemToCart = async function(userId, productId) {
    // Get the user's cart ID
    const cartQuery = 'SELECT CartID FROM Cart WHERE UserID = ?';
    const [carts] = await db.query(cartQuery, [userId]);
    if (carts.length === 0) {
        throw new Error('User cart not found');
    }
    const cartId = carts[0].CartID;

    // Get the current price of the product
    const productQuery = 'SELECT Price FROM Product WHERE ProductID = ?';
    const [products] = await db.query(productQuery, [productId]);
    if (products.length === 0) {
        throw new Error('Product not found');
    }
    const price = products[0].Price;

    // Insert the cart item
    const insertQuery = 'INSERT INTO Cart_Item (CartID, ProductID, Quantity, Price) VALUES (?, ?, 1, ?)';
    const [result] = await db.query(insertQuery, [cartId, productId, price]);
    
    return result.insertId;
};
    

// In the model or a separate data access layer file
exports.updateCartItemQuantity = async function(cartItemId, quantity) {
    const updateQuery = 'UPDATE Cart_Item SET Quantity = ? WHERE CartItemID = ?';
    
    try {
        const [result] = await db.execute(updateQuery, [quantity, cartItemId]);
        return result.affectedRows; // Returns the number of rows affected
    } catch (error) {
        throw new Error('Database error: ' + error.message);
    }
};



exports.removeItemFromCart = async function removeItemFromCart(cartItemId) {
    const deleteQuery = 'DELETE FROM Cart_Item WHERE CartItemID = ?';
    const [result] = await db.query(deleteQuery, [cartItemId]);
  
    if (result.affectedRows === 0) {
      throw new Error('Cart item not found');
    }
  
    return result.affectedRows; // The number of affected rows can be used to confirm the deletion
  };



exports.checkCartOwnership = async (requesterId, cartId) => {
const ownerId = await CartModel.getUserIdByCartId(cartId);
return ownerId === requesterId;
};



exports.getCartIdByItemIdAndUserId = async function getCartIdByItemIdAndUserId(cartItemId, userId) {
const query = `
    SELECT c.CartID FROM Cart_Item ci
    JOIN cart c ON ci.CartID = c.CartID
    WHERE ci.CartItemID = ? AND c.UserID = ?`;

const [rows] = await db.query(query, [cartItemId, userId]);
return rows.length ? rows[0].CartID : null;
};




exports.getCartItemIDByProductAndUserID = async function(productId, userId) {
    const query = `
        SELECT ci.CartItemID FROM Cart_Item ci
        JOIN Cart c ON ci.CartID = c.CartID
        WHERE ci.ProductID = ? AND c.UserID = ?`;

    try {
        const [rows] = await db.execute(query, [productId, userId]);
        console.log(rows);
        return rows.length ? rows[0].CartItemID : null;
    } catch (error) {
        throw new Error('Database error: ' + error.message);
    }
};


