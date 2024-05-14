const db = require('../database/database'); // Your database module
const model = require('../models/cart');
const permissions = require('../permissions/cart'); 

class CartController {
  // Get all carts (potentially for admin use)
  static async getAllCarts(ctx) {
    const permission = permissions.readAllCarts(ctx.state.user);
    if (!permission.granted) {
      ctx.status = 403;
      ctx.body = { message: "You do not have permission to get carts." };
      return;
    }
    try {
      const rows=await model.getAllCarts(ctx);
      ctx.body = { data: rows };
      ctx.status = 200;
    } catch (error) {
      console.error('Error in CartController.getAllCarts:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }

  // Get a specific user's cart
  static async getUserCart(ctx) {
    console.log('reached')
    const userId = ctx.state.user.id;
    //const { userId } = ctx.params;
    const numericUserId = parseInt(userId, 10);
    const permission = permissions.createUserCart(ctx.state.user,numericUserId);
    if (!permission.granted) {
      ctx.status = 403;
      ctx.body = { message: "You do not have permission to create cart." };
      return;
    }
    
    try {
      const [rows]= await model.getUserCart(userId);
      if (rows.length === 0) {
        ctx.status = 404;
        ctx.body = { error: 'Cart not found' };
        return;
      }
      ctx.body = rows ; // Assuming one cart per user
      ctx.status = 200;
    } catch (error) {
      console.error('Error in CartController.getUserCart:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }

  // Create a new cart for a user
  static async createCartForUser(ctx) {
    const userId = ctx.state.user.id;
    const numericUserId = parseInt(userId, 10);
    const permission = permissions.createUserCart(ctx.state.user,numericUserId);
    if (!permission.granted) {
      ctx.status = 403;
      ctx.body = { message: "You do not have permission to create cart." };
      return;
    }

    try {
      const result = await model.createCartForUser(userId);
      ctx.status = 201;
      ctx.body = { cart_id: result.insertId, message: 'Cart created successfully' };
    } catch (error) {
      console.error('Error in CartController.createCartForUser:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }

  // Delete a specific cart
  static async deleteCart(ctx) {
    const userId = ctx.state.user.id;
    const numericUserId = parseInt(userId, 10)
  
    // Get the UserID that owns the CartID from the database
    // const userIdOfCart = await model.getUserIdByCartId(cartId);
  
    
    if (!userId) {
      ctx.status = 404;
      ctx.body = { message: "Cart not found." };
      return;
    }
    // Check if the user has permission to delete the cart
    const permission = permissions.deleteUserCart(ctx.state.user, numericUserId);
    if (!permission.granted) {
      ctx.status = 403;
      ctx.body = { message: "You do not have permission to delete this cart." };
      return;
    }
    console.log(numericUserId + " export")
    try {
      const result = await model.deleteCart(userId);
      if (result.success) {
        ctx.status = 200;
        ctx.body = { message: result.message };
      } else {
        ctx.status = 404;
        ctx.body = { error: 'Cart not found' };
      }
    } catch (error) {
      console.error('Error in CartController.deleteCart:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }
}

module.exports = CartController;
