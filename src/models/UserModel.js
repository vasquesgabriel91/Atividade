const db = require("../config/database");

const UserModel = {
  // Criar um novo usuário
  create: (name, email, password, role, birth_date, callback) => {
    const sql = `INSERT INTO users (name, email, password, role, birth_date) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [name, email, password, role, birth_date], function (err) {
      callback(err, this ? this.lastID : null);
    });
  },

  // Buscar usuário pelo e-mail
  findByEmail: (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, user) => {
      callback(err, user);
    });
  },

  // Buscar usuário pelo ID
  findById: (id, callback) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    db.get(sql, [id], (err, user) => {
      callback(err, user);
    });
  },

  // Atualizar dados do usuário
  update: (id, name, email, callback) => {
    const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    db.run(sql, [name, email, id], function (err) {
      callback(err, this.changes);
    });
  },

  updatePassword: (id, newPassword, callback) => {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    db.run(query, [newPassword, id], function (err) {
      if (err) return callback(err);
      callback(null, this.changes); 
    });
  },

  // Excluir um usuário
  delete: (id, callback) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    db.run(sql, [id], function (err) {
      callback(err, this.changes);
    });
  },

  // Listar todos os usuários (somente admin pode usar)
  findAll: (callback) => {
    const sql = `SELECT id, name, email, role, created_at FROM users`;
    db.all(sql, [], (err, users) => {
      callback(err, users);
    });
  },


};

module.exports = UserModel;
