const UserService = require("../services/UserService");
const logEvent = require("../services/LogService");

const UserController = {
  // Criar novo usuário
  createUser: (req, res) => {
    const { name, email, password, role, birth_date } = req.body;

    if (!name || !email || !password || !role || !birth_date) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    UserService.createUser(name, email, password, role, birth_date, (err, userId) => {
      if (err) return res.status(400).json({ error: err.message });

      logEvent(`Conta criada - Usuário ID: ${userId}`);
      res.status(201).json({ message: "Usuário criado com sucesso!", userId });
    });
  },

  // Obter detalhes do usuário pelo ID
  getUserById: (req, res) => {
    const { id } = req.params;

    UserService.getUserById(id, (err, user) => {
      if (err) return res.status(404).json({ error: err.message });
      res.json(user);
    });
  },

  // Atualizar usuário
  updateUser: (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Nome e e-mail são obrigatórios." });
    }

    UserService.updateUser(id, name, email, (err, message) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message });
    });
  },

  // Excluir usuário
  deleteUser: (req, res) => {
    const { id } = req.params;

    UserService.deleteUser(id, (err, message) => {
      if (err) return res.status(400).json({ error: err.message });

      logEvent(`Conta excluída - Usuário ID: ${id}`);
      res.json({ message });
    });
  },

  // Listar todos os usuários
  listUsers: (req, res) => {
    UserService.listUsers((err, users) => {
      if (err)
        return res.status(500).json({ error: "Erro ao buscar usuários." });
      res.json(users);
    });
  },
};

module.exports = UserController;
