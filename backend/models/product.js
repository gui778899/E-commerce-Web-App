const db = require('../database/database');

exports.allproducts = async function allproducts(ctx) {
    const query = 'SELECT * FROM Product;';
    const [rows] = await db.query(query);
    return rows;
}


exports.byId = async function byId(ctx) {
    const productId = ctx.params.id;
    const query = 'SELECT * FROM Product WHERE ProductID = ?;';
    const [rows] = await db.query(query, [productId]);
    return rows;
}


exports.delete = async function deleteProduct(ctx) {
    const productId = ctx.params.id;
    const query = 'DELETE FROM Product WHERE ProductID = ?;';
    const [result] = await db.query(query, [productId]);
    return result;
}


exports.add = async function add(ctx) {
    const { Name, Description, Price, StockQuantity } = ctx.request.body;
    const query = 'INSERT INTO Product (Name, Description, Price, StockQuantity) VALUES (?, ?, ?, ?);';
    const [result] = await db.query(query, [Name, Description, Price, StockQuantity]);
    return result;
}



exports.update = async function update(ctx) {
    const productId = ctx.params.id;
    const { Name, Description, Price, StockQuantity } = ctx.request.body;
    const query = 'UPDATE Product SET Name = ?, Description = ?, Price = ?, StockQuantity = ? WHERE ProductID = ?;';
    const [result] = await db.query(query, [Name, Description, Price, StockQuantity, productId]);
    return result;
}