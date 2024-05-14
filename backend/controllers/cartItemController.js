const db = require('../database/database'); // Adjust the path to your actual database module
const model = require('../models/cartitem')
const permissions= require('../permissions/cartitem') 
const CartModel = require('../models/cart');

class CartItemController {
  // Get all items in a cart
  static async getItems(ctx) {
    const userId = ctx.state.user.id;
    const cartId = await CartModel.getCartIdByUserId(userId);
            if (!cartId && ctx.state.user.role !== 'admin') {
                ctx.status = 404;
                ctx.body = { message: "User's cart not found." };
                return;
            }
    const permission =await permissions.readCartItem(ctx.state.user,cartId);
    if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to get cart." };
        return;
      }
    try {
      const rows = await model.getCartItems(cartId);
      console.log(rows);
      ctx.body = rows;
      ctx.status = 200;
    } catch (error) {
      console.error('Error in CartItemController.getCartItems:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }

  static async addItemToCart(ctx) {
   
    const { productId } = ctx.request.body; // Getting product ID from the request
    const userId = ctx.state.user.id; // Assuming the user ID is stored in ctx.state.user
        try {
            // Get the user's cart ID
            const cartId = await CartModel.getCartIdByUserId(userId);
            if (!cartId && ctx.state.user.role !== 'admin') {
                ctx.status = 404;
                ctx.body = { message: "User's cart not found." };
                return;
            }

            // Check if the user is either an admin or owns the cart
            const permissionCheck = await permissions.createCartItem(ctx.state.user, cartId);
            if (!permissionCheck.granted) {
                ctx.status = 403;
                ctx.body = { message: "You do not have permission to add items to this cart." };
                return;
            }
        // Delegate the database work to the model function
        const insertId = await model.addItemToCart(userId, productId);
  
        ctx.status = 201;
        ctx.body = { data: insertId, message: 'Item added to cart successfully' };
    } catch (error) {
        console.error('Error in CartItemController.addItemToCart:', error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
}




  // Update the quantity of an item in a cart
// In the controller
static async updateCartItem(ctx) {
  const { quantity } = ctx.request.body; 
  const ItemId = ctx.params.ItemId;
    const userId = ctx.state.user.id; // Assuming the user ID is stored in ctx.state.user
        try {
          const cartId = await CartModel.getCartIdByUserId(userId);
            if (!cartId && ctx.state.user.role !== 'admin') {
                ctx.status = 404;
                ctx.body = { message: "User's cart not found." };
                return;
            }
            // Get the user's cart ID
            console.log(ItemId);
            console.log(userId);

            const cartItemId = await model.getCartItemIDByProductAndUserID(ItemId, userId);
            console.log(cartItemId);
            if (!cartId && ctx.state.user.role !== 'admin'){
                ctx.status = 404;
                ctx.body = { message: "Cart item not found or not associated with the user's cart." };
                return;
            }

            // Check if the user is either an admin or owns the cart
            const permissionCheck = await permissions.updateCartItem(ctx.state.user, cartId);
            if (!permissionCheck.granted) {
                ctx.status = 403;
                ctx.body = { message: "You do not have permission to add items to this cart." };
                return;
            }
        // Delegate the database work to the model function
        const insertId = await model.updateCartItemQuantity(cartItemId, quantity);
  
        ctx.status = 201;
        ctx.body = { data: insertId, message: 'Item added to cart successfully' };
    } catch (error) {
        console.error('Error in CartItemController.addItemToCart:', error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
}


  // Remove an item from a cart
  static async removeItemFromCart(ctx) {
    const ItemId = ctx.params.ItemId;
    const userId = ctx.state.user.id; // Assuming ctx.state.user contains the userId

    // First, find the cartId
    const cartitemId = await model.getCartItemIDByProductAndUserID(ItemId, userId);
    const cartid = await model.getCartIdByItemIdAndUserId(cartitemId, userId);
    console.log('cartid',cartid);
    if (!cartid && ctx.state.user.role !== 'admin') {
        ctx.status = 404;
        ctx.body = { message: "Cart item not found or you do not have permission to delete it." };
        return;
    }

    // Now check permission
    const permission = await permissions.deleteCartItem(ctx.state.user, cartid);
    if (!permission.granted) {
        ctx.status = 403;
        ctx.body = { message: "You do not have permission to delete this cart item." };
        return;
    }
    try {
      // Delegate the database work to the model function
      await model.removeItemFromCart(cartitemId);
  
      ctx.status = 200;
      ctx.body = { message: 'Cart item removed successfully' };
    } catch (error) {
      if (error.message === 'Cart item not found') {
        ctx.status = 404;
        ctx.body = { error: error.message };
      } else {
        console.error('Error in CartItemController.removeItemFromCart:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
      }
    }
  }
}

module.exports = CartItemController;
