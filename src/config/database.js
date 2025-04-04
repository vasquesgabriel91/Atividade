const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Caminho do banco de dados SQLite
const dbPath = path.resolve(__dirname, "../../database.sqlite");

// Criar e conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

module.exports = db;
