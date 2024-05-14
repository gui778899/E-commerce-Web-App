const db = require('../database/database');
const bcrypt = require('bcrypt');

//search for User based on email pattern
exports.emailSearch = async function emailSearch (q) {
  const query = "SELECT * FROM User WHERE email LIKE ?;";
  const data = await db.query(query, '%'+q+'%');
  return data;
}

//get a single user by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM User WHERE UserID = ?;";
  const values = [id];
  const data = await db.query(query, values);
  return data;
}

//get a single user by the (unique) username
exports.findByUsername = async function getByUsername(username) {
  const query = "SELECT * FROM User WHERE username = ?;";
  try {
    const [rows] = await db.query(query, [username]);
    // Assuming 'rows' contains your result set and you expect a single user object
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    // Handle or throw the database error
    console.error('Error in findByUsername:', error);
    throw error;
  }
};


//list all the User in the database
exports.getAll = async function getAll (limit=10, page=1) {
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM User LIMIT ?,?;";
  const data = await db.query(query, [offset, limit]);
  return data;
}

//create a new user in the database
exports.add = async function add (user) {
  const query = "INSERT INTO User SET ?";
  const password = user.password;
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  const data = await db.query(query, user);
  return data;
}

exports.delById = async function delById(id) {
  try {
    // Deleting from payment table
    let query = "DELETE FROM payment WHERE OrderID IN (SELECT OrderID FROM `order` WHERE UserID = ?);";
    let values = [id];
    let data = await db.query(query, values);

    // Deleting from address table
    query = "DELETE FROM address WHERE UserID = ?;";
    data = await db.query(query, values);

    // Deleting from ShippingInformation table
    query = "DELETE FROM ShippingInformation WHERE OrderID IN (SELECT OrderID FROM `order` WHERE UserID = ?);";
    data = await db.query(query, values);

    // Deleting from order table
    query = "DELETE FROM `order` WHERE UserID = ?;";
    data = await db.query(query, values);

    // Deleting from Cart_item table
    query = "DELETE FROM Cart_item WHERE CartID IN (SELECT CartID FROM cart WHERE UserID = ?);";
    data = await db.query(query, values);

    // Deleting from cart table
    query = "DELETE FROM cart WHERE UserID = ?;";
    data = await db.query(query, values);

    // Finally, deleting from user table
    query = "DELETE FROM User WHERE UserID = ?;";
    data = await db.query(query, values);

    return data;
  } catch (error) {
    console.error('Error in delById:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};





//update an existing user
exports.update = async function update (user) {
  const query = "UPDATE User SET ? WHERE UserID = ?;";
  if (user.password) {
    const password = user.password;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;  
  }
  const values = [user, user.UserID];
  const data = await db.query(query, values);
  return data;
}

