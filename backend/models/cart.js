const db = require('../database/database');

exports.getAllCarts = async function getAllCarts(ctx) {
    const query = 'SELECT * FROM Cart;';
    const [rows] = await db.query(query);
    return rows;

}

exports.getUserCart = async function getUserCart(ctx) {
    const userId = ctx
    const query = 'SELECT * FROM Cart WHERE UserID = ?;';
    const [rows] = await db.query(query, [userId]);
    return [rows];
}


exports.createCartForUser = async function createCartForUser(ctx) {
    const userId = ctx;
    const [result] = await db.query('INSERT INTO Cart (UserID, CreationDateTime) VALUES (?, NOW())', [userId]);
    return result;
}

exports.deleteCart = async function deleteCart(ctx) {
    const userId = ctx;
    try {
        // First, find the CartID for the given UserID
        const [carts] = await db.query('SELECT CartID FROM Cart WHERE UserID = ?', [userId]);
        if (carts.length === 0) {
            throw new Error('No cart found for this user.');
        }
        const cartId = carts[0].CartID;

        // Delete all Cart_Items entries for this CartID
        await db.query('DELETE FROM Cart_Item WHERE CartID = ?', [cartId]);

        // Now delete the cart itself
        await db.query('DELETE FROM Cart WHERE CartID = ?', [cartId]);

        return { success: true, message: 'Cart and cart items deleted successfully.' };
    } catch (error) {
        // Handle the error (e.g., no cart found or database errors)
        console.error(error);
        throw error; // Re-throw the error to be handled by the calling function
    }
}

exports.getUserIdByCartId=  async function  getUserIdByCartId (cartId){
  const query = 'SELECT UserID FROM cart WHERE CartID = ?';
  const [rows] = await db.execute(query, [cartId]);
  return rows.length ? rows[0].UserID : null;
}


exports.getCartIdByUserId = async function(userId) {
    const query = 'SELECT CartID FROM Cart WHERE UserID = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows.length ? rows[0].CartID : null;
};
