const db = require('../database/database');

exports.getAllRoles = async function getAllRoles () {
    const query = 'SELECT * FROM roles';
    return db.query(query);
};
  
exports.getRoleByName = async function getRoleByName (name)  {
const query = 'SELECT * FROM roles WHERE name = ?';
return db.query(query, [name]);
};

exports.createRole = async function createRole (name, description)  {
const query = 'INSERT INTO roles (name, description) VALUES (?, ?)';
return db.query(query, [name, description]);
};

exports.updateRole = async function updateRole (name, description)  {
const query = 'UPDATE roles SET description = ? WHERE name = ?';
return db.query(query, [description, name]);
};

exports.deleteRole = async function deleteRole (name) {
const query = 'DELETE FROM roles WHERE name = ?';
return db.query(query, [name]);
};