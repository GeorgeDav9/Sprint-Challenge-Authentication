// Imports
const db = require("../database/dbConfig.js");

module.exports = {
  addUser,
  findById,
  findBy
};

function findBy(filter) {
  return db("users").where(filter);
};

async function addUser(newUser) {
  const [id] = await db("users").insert(newUser);

  return findById(id);
};

function findById(id) {
  return db("users")
    .where({ id })
    .first();
};